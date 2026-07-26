<?php
/**
 * Import demo content from seed/content.json.
 *
 * @package Portfolio_CMS
 */

declare(strict_types=1);

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handle import admin-post action.
 */
function portfolio_cms_handle_import_seed(): void {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( esc_html__( 'Forbidden.', 'portfolio-cms' ) );
	}

	check_admin_referer( 'portfolio_cms_import_seed' );

	$path = PORTFOLIO_CMS_PATH . 'seed/content.json';
	if ( ! is_readable( $path ) ) {
		wp_safe_redirect(
			add_query_arg(
				array(
					'page'                 => 'portfolio-cms',
					'portfolio_cms_seed'   => 'missing',
				),
				admin_url( 'admin.php' )
			)
		);
		exit;
	}

	$raw  = file_get_contents( $path ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
	$data = is_string( $raw ) ? json_decode( $raw, true ) : null;

	if ( ! is_array( $data ) ) {
		wp_safe_redirect(
			add_query_arg(
				array(
					'page'               => 'portfolio-cms',
					'portfolio_cms_seed' => 'invalid',
				),
				admin_url( 'admin.php' )
			)
		);
		exit;
	}

	$result = portfolio_cms_import_seed_data( $data );

	wp_safe_redirect(
		add_query_arg(
			array(
				'page'                 => 'portfolio-cms',
				'portfolio_cms_seed'   => $result['ok'] ? 'success' : 'fail',
				'portfolio_cms_detail' => rawurlencode( $result['message'] ),
			),
			admin_url( 'admin.php' )
		)
	);
	exit;
}
add_action( 'admin_post_portfolio_cms_import_seed', 'portfolio_cms_handle_import_seed' );

/**
 * Import seed payload.
 *
 * @param array<string, mixed> $data Seed data.
 * @return array{ok: bool, message: string}
 */
function portfolio_cms_import_seed_data( array $data ): array {
	$counts = array(
		'posts'    => 0,
		'projects' => 0,
	);

	if ( isset( $data['identity'] ) && is_array( $data['identity'] ) ) {
		update_option( 'portfolio_cms_identity', portfolio_cms_sanitize_identity( $data['identity'] ) );
	}
	if ( isset( $data['about'] ) && is_array( $data['about'] ) ) {
		update_option( 'portfolio_cms_about', portfolio_cms_sanitize_about( $data['about'] ) );
	}
	if ( isset( $data['series'] ) && is_array( $data['series'] ) ) {
		update_option( 'portfolio_cms_series', portfolio_cms_sanitize_series( $data['series'] ) );
	}
	if ( isset( $data['editorial'] ) && is_array( $data['editorial'] ) ) {
		if ( isset( $data['editorial']['en'] ) && is_array( $data['editorial']['en'] ) ) {
			update_option( 'portfolio_cms_editorial_en', portfolio_cms_sanitize_editorial( $data['editorial']['en'] ) );
		}
		if ( isset( $data['editorial']['fr'] ) && is_array( $data['editorial']['fr'] ) ) {
			update_option( 'portfolio_cms_editorial_fr', portfolio_cms_sanitize_editorial( $data['editorial']['fr'] ) );
		}
	}

	if ( ! empty( $data['posts'] ) && is_array( $data['posts'] ) ) {
		foreach ( $data['posts'] as $post ) {
			if ( ! is_array( $post ) ) {
				continue;
			}
			if ( portfolio_cms_upsert_post_from_seed( $post ) ) {
				++$counts['posts'];
			}
		}
	}

	if ( ! empty( $data['projects'] ) && is_array( $data['projects'] ) ) {
		foreach ( $data['projects'] as $project ) {
			if ( ! is_array( $project ) ) {
				continue;
			}
			if ( portfolio_cms_upsert_project_from_seed( $project ) ) {
				++$counts['projects'];
			}
		}
	}

	portfolio_cms_trigger_revalidate( array( 'cms', 'cms-posts', 'cms-projects', 'cms-site' ) );

	return array(
		'ok'      => true,
		'message' => sprintf(
			/* translators: 1: posts count, 2: projects count */
			__( 'Imported %1$d posts and %2$d projects; options updated.', 'portfolio-cms' ),
			$counts['posts'],
			$counts['projects']
		),
	);
}

/**
 * Find CPT by post_name.
 *
 * @param string $post_type Post type.
 * @param string $slug      Slug.
 * @return int Post ID or 0.
 */
function portfolio_cms_find_by_slug( string $post_type, string $slug ): int {
	$posts = get_posts(
		array(
			'post_type'      => $post_type,
			'name'           => $slug,
			'post_status'    => array( 'publish', 'draft', 'private' ),
			'posts_per_page' => 1,
			'fields'         => 'ids',
		)
	);
	return ! empty( $posts ) ? (int) $posts[0] : 0;
}

/**
 * Upsert article from seed row.
 *
 * @param array<string, mixed> $row Seed post.
 * @return bool
 */
function portfolio_cms_upsert_post_from_seed( array $row ): bool {
	$slug = sanitize_title( (string) ( $row['slug'] ?? '' ) );
	if ( $slug === '' ) {
		return false;
	}

	$title_en = (string) ( $row['title']['en'] ?? $row['title_en'] ?? $slug );
	$post_id  = portfolio_cms_find_by_slug( 'portfolio_post', $slug );

	$postarr = array(
		'post_type'   => 'portfolio_post',
		'post_status' => 'publish',
		'post_title'  => $title_en,
		'post_name'   => $slug,
	);

	if ( $post_id > 0 ) {
		$postarr['ID'] = $post_id;
		$post_id       = wp_update_post( $postarr, true );
	} else {
		$post_id = wp_insert_post( $postarr, true );
	}

	if ( is_wp_error( $post_id ) || ! $post_id ) {
		return false;
	}

	$post_id = (int) $post_id;

	update_post_meta( $post_id, 'title_en', sanitize_text_field( (string) ( $row['title']['en'] ?? $row['title_en'] ?? '' ) ) );
	update_post_meta( $post_id, 'title_fr', sanitize_text_field( (string) ( $row['title']['fr'] ?? $row['title_fr'] ?? '' ) ) );
	update_post_meta( $post_id, 'description_en', sanitize_textarea_field( (string) ( $row['description']['en'] ?? $row['description_en'] ?? '' ) ) );
	update_post_meta( $post_id, 'description_fr', sanitize_textarea_field( (string) ( $row['description']['fr'] ?? $row['description_fr'] ?? '' ) ) );
	update_post_meta( $post_id, 'content_en', wp_kses_post( (string) ( $row['content']['en'] ?? $row['content_en'] ?? '' ) ) );
	update_post_meta( $post_id, 'content_fr', wp_kses_post( (string) ( $row['content']['fr'] ?? $row['content_fr'] ?? '' ) ) );
	update_post_meta( $post_id, 'post_date', sanitize_text_field( (string) ( $row['date'] ?? $row['post_date'] ?? '' ) ) );

	$tags = $row['tags'] ?? '';
	if ( is_array( $tags ) ) {
		$tags = implode( ', ', $tags );
	}
	update_post_meta( $post_id, 'tags', sanitize_text_field( (string) $tags ) );

	if ( isset( $row['series'] ) ) {
		update_post_meta( $post_id, 'series', sanitize_text_field( (string) $row['series'] ) );
	}
	if ( isset( $row['seriesOrder'] ) || isset( $row['series_order'] ) ) {
		update_post_meta( $post_id, 'series_order', absint( $row['seriesOrder'] ?? $row['series_order'] ?? 0 ) );
	}

	return true;
}

/**
 * Upsert project from seed row.
 *
 * @param array<string, mixed> $row Seed project.
 * @return bool
 */
function portfolio_cms_upsert_project_from_seed( array $row ): bool {
	$slug = sanitize_title( (string) ( $row['slug'] ?? $row['project_slug'] ?? '' ) );
	if ( $slug === '' ) {
		return false;
	}

	$title   = (string) ( $row['title'] ?? $slug );
	$post_id = portfolio_cms_find_by_slug( 'portfolio_project', $slug );

	$postarr = array(
		'post_type'   => 'portfolio_project',
		'post_status' => 'publish',
		'post_title'  => $title,
		'post_name'   => $slug,
		'menu_order'  => isset( $row['menu_order'] ) ? absint( $row['menu_order'] ) : 0,
	);

	if ( $post_id > 0 ) {
		$postarr['ID'] = $post_id;
		$post_id       = wp_update_post( $postarr, true );
	} else {
		$post_id = wp_insert_post( $postarr, true );
	}

	if ( is_wp_error( $post_id ) || ! $post_id ) {
		return false;
	}

	$post_id = (int) $post_id;

	update_post_meta( $post_id, 'project_slug', $slug );
	update_post_meta( $post_id, 'year', sanitize_text_field( (string) ( $row['year'] ?? '' ) ) );

	$category = sanitize_text_field( (string) ( $row['category'] ?? 'Apps' ) );
	if ( in_array( $category, array( 'Games', 'Utilities', 'Apps' ), true ) ) {
		update_post_meta( $post_id, 'category', $category );
	}

	$tech = $row['technologies'] ?? '';
	if ( is_array( $tech ) ) {
		$tech = implode( ', ', $tech );
	}
	update_post_meta( $post_id, 'technologies', sanitize_text_field( (string) $tech ) );

	if ( ! empty( $row['githubUrl'] ) || ! empty( $row['github_url'] ) ) {
		update_post_meta( $post_id, 'github_url', esc_url_raw( (string) ( $row['githubUrl'] ?? $row['github_url'] ) ) );
	}
	if ( ! empty( $row['liveUrl'] ) || ! empty( $row['live_url'] ) ) {
		update_post_meta( $post_id, 'live_url', esc_url_raw( (string) ( $row['liveUrl'] ?? $row['live_url'] ) ) );
	}

	update_post_meta( $post_id, 'featured', ! empty( $row['featured'] ) );
	update_post_meta( $post_id, 'accent_color', sanitize_text_field( (string) ( $row['accentColor'] ?? $row['accent_color'] ?? '' ) ) );

	update_post_meta( $post_id, 'summary_en', sanitize_textarea_field( (string) ( $row['summary']['en'] ?? $row['summary_en'] ?? '' ) ) );
	update_post_meta( $post_id, 'summary_fr', sanitize_textarea_field( (string) ( $row['summary']['fr'] ?? $row['summary_fr'] ?? '' ) ) );

	$hl_en = $row['highlights']['en'] ?? $row['highlights_en'] ?? '';
	$hl_fr = $row['highlights']['fr'] ?? $row['highlights_fr'] ?? '';
	if ( is_array( $hl_en ) ) {
		$hl_en = implode( "\n", $hl_en );
	}
	if ( is_array( $hl_fr ) ) {
		$hl_fr = implode( "\n", $hl_fr );
	}
	update_post_meta( $post_id, 'highlights_en', sanitize_textarea_field( (string) $hl_en ) );
	update_post_meta( $post_id, 'highlights_fr', sanitize_textarea_field( (string) $hl_fr ) );

	return true;
}

/**
 * Admin notices after seed import.
 */
function portfolio_cms_seed_admin_notice(): void {
	if ( ! isset( $_GET['page'] ) || $_GET['page'] !== 'portfolio-cms' ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		return;
	}
	if ( empty( $_GET['portfolio_cms_seed'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		return;
	}

	$status = sanitize_key( (string) wp_unslash( $_GET['portfolio_cms_seed'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$detail = isset( $_GET['portfolio_cms_detail'] ) // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		? sanitize_text_field( rawurldecode( (string) wp_unslash( $_GET['portfolio_cms_detail'] ) ) ) // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		: '';

	$class   = 'notice-error';
	$message = __( 'Demo import failed.', 'portfolio-cms' );

	if ( $status === 'success' ) {
		$class   = 'notice-success';
		$message = $detail !== '' ? $detail : __( 'Demo content imported successfully.', 'portfolio-cms' );
	} elseif ( $status === 'missing' ) {
		$message = __( 'seed/content.json was not found or is not readable.', 'portfolio-cms' );
	} elseif ( $status === 'invalid' ) {
		$message = __( 'seed/content.json is not valid JSON.', 'portfolio-cms' );
	} elseif ( $detail !== '' ) {
		$message = $detail;
	}

	printf(
		'<div class="notice %1$s is-dismissible"><p>%2$s</p></div>',
		esc_attr( $class ),
		esc_html( $message )
	);
}
add_action( 'admin_notices', 'portfolio_cms_seed_admin_notice' );
