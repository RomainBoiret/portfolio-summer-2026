<?php
/**
 * Post meta registration and admin meta boxes.
 *
 * @package Portfolio_CMS
 */

declare(strict_types=1);

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Auth callback: allow reading meta via REST (public portfolio data).
 *
 * @return bool
 */
function portfolio_cms_meta_auth_read(): bool {
	return true;
}

/**
 * Register a string meta key.
 *
 * @param string               $post_type Post type.
 * @param string               $key       Meta key.
 * @param array<string, mixed> $args      Extra args.
 */
function portfolio_cms_register_string_meta( string $post_type, string $key, array $args = array() ): void {
	register_post_meta(
		$post_type,
		$key,
		array_merge(
			array(
				'type'              => 'string',
				'single'            => true,
				'show_in_rest'      => true,
				'auth_callback'     => 'portfolio_cms_meta_auth_read',
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => '',
			),
			$args
		)
	);
}

/**
 * Register meta for posts and projects.
 */
function portfolio_cms_register_meta(): void {
	$post_string_keys = array(
		'title_en',
		'title_fr',
		'description_en',
		'description_fr',
		'post_date',
		'tags',
		'series',
	);

	foreach ( $post_string_keys as $key ) {
		portfolio_cms_register_string_meta( 'portfolio_post', $key );
	}

	portfolio_cms_register_string_meta(
		'portfolio_post',
		'content_en',
		array(
			'sanitize_callback' => 'wp_kses_post',
			'show_in_rest'      => array(
				'schema' => array(
					'type' => 'string',
				),
			),
		)
	);
	portfolio_cms_register_string_meta(
		'portfolio_post',
		'content_fr',
		array(
			'sanitize_callback' => 'wp_kses_post',
			'show_in_rest'      => array(
				'schema' => array(
					'type' => 'string',
				),
			),
		)
	);

	register_post_meta(
		'portfolio_post',
		'series_order',
		array(
			'type'              => 'integer',
			'single'            => true,
			'show_in_rest'      => true,
			'auth_callback'     => 'portfolio_cms_meta_auth_read',
			'sanitize_callback' => 'absint',
			'default'           => 0,
		)
	);

	$project_string_keys = array(
		'project_slug',
		'year',
		'category',
		'technologies',
		'github_url',
		'live_url',
		'accent_color',
		'summary_en',
		'summary_fr',
		'highlights_en',
		'highlights_fr',
	);

	foreach ( $project_string_keys as $key ) {
		$args = array();
		if ( in_array( $key, array( 'summary_en', 'summary_fr', 'highlights_en', 'highlights_fr' ), true ) ) {
			$args['sanitize_callback'] = 'sanitize_textarea_field';
		}
		if ( in_array( $key, array( 'github_url', 'live_url' ), true ) ) {
			$args['sanitize_callback'] = 'esc_url_raw';
		}
		portfolio_cms_register_string_meta( 'portfolio_project', $key, $args );
	}

	register_post_meta(
		'portfolio_project',
		'featured',
		array(
			'type'              => 'boolean',
			'single'            => true,
			'show_in_rest'      => true,
			'auth_callback'     => 'portfolio_cms_meta_auth_read',
			'sanitize_callback' => static function ( $value ): bool {
				return (bool) $value;
			},
			'default'           => false,
		)
	);
}
add_action( 'init', 'portfolio_cms_register_meta' );

/**
 * Add meta boxes.
 */
function portfolio_cms_add_meta_boxes(): void {
	add_meta_box(
		'portfolio_cms_post_fields',
		__( 'Article fields', 'portfolio-cms' ),
		'portfolio_cms_render_post_meta_box',
		'portfolio_post',
		'normal',
		'high'
	);

	add_meta_box(
		'portfolio_cms_project_fields',
		__( 'Project fields', 'portfolio-cms' ),
		'portfolio_cms_render_project_meta_box',
		'portfolio_project',
		'normal',
		'high'
	);
}
add_action( 'add_meta_boxes', 'portfolio_cms_add_meta_boxes' );

/**
 * Render a labeled text input.
 *
 * @param int    $post_id Post ID.
 * @param string $key     Meta key.
 * @param string $label   Label.
 */
function portfolio_cms_field_text( int $post_id, string $key, string $label ): void {
	$value = (string) get_post_meta( $post_id, $key, true );
	printf(
		'<p><label for="%1$s"><strong>%2$s</strong></label><br /><input type="text" class="widefat" id="%1$s" name="%1$s" value="%3$s" /></p>',
		esc_attr( $key ),
		esc_html( $label ),
		esc_attr( $value )
	);
}

/**
 * Render a labeled textarea.
 *
 * @param int    $post_id Post ID.
 * @param string $key     Meta key.
 * @param string $label   Label.
 * @param int    $rows    Rows.
 */
function portfolio_cms_field_textarea( int $post_id, string $key, string $label, int $rows = 4 ): void {
	$value = (string) get_post_meta( $post_id, $key, true );
	printf(
		'<p><label for="%1$s"><strong>%2$s</strong></label><br /><textarea class="widefat" id="%1$s" name="%1$s" rows="%4$d">%3$s</textarea></p>',
		esc_attr( $key ),
		esc_html( $label ),
		esc_textarea( $value ),
		$rows
	);
}

/**
 * Article meta box.
 *
 * @param WP_Post $post Post.
 */
function portfolio_cms_render_post_meta_box( WP_Post $post ): void {
	wp_nonce_field( 'portfolio_cms_save_post', 'portfolio_cms_post_nonce' );

	portfolio_cms_field_text( $post->ID, 'title_en', __( 'Title (EN)', 'portfolio-cms' ) );
	portfolio_cms_field_text( $post->ID, 'title_fr', __( 'Title (FR)', 'portfolio-cms' ) );
	portfolio_cms_field_textarea( $post->ID, 'description_en', __( 'Description (EN)', 'portfolio-cms' ), 3 );
	portfolio_cms_field_textarea( $post->ID, 'description_fr', __( 'Description (FR)', 'portfolio-cms' ), 3 );
	portfolio_cms_field_textarea( $post->ID, 'content_en', __( 'Content HTML (EN)', 'portfolio-cms' ), 12 );
	portfolio_cms_field_textarea( $post->ID, 'content_fr', __( 'Content HTML (FR)', 'portfolio-cms' ), 12 );
	portfolio_cms_field_text( $post->ID, 'post_date', __( 'Date (Y-m-d)', 'portfolio-cms' ) );
	portfolio_cms_field_text( $post->ID, 'tags', __( 'Tags (CSV)', 'portfolio-cms' ) );
	portfolio_cms_field_text( $post->ID, 'series', __( 'Series id', 'portfolio-cms' ) );
	portfolio_cms_field_text( $post->ID, 'series_order', __( 'Series order', 'portfolio-cms' ) );
}

/**
 * Project meta box.
 *
 * @param WP_Post $post Post.
 */
function portfolio_cms_render_project_meta_box( WP_Post $post ): void {
	wp_nonce_field( 'portfolio_cms_save_project', 'portfolio_cms_project_nonce' );

	portfolio_cms_field_text( $post->ID, 'project_slug', __( 'Project slug (optional; falls back to permalink slug)', 'portfolio-cms' ) );
	portfolio_cms_field_text( $post->ID, 'year', __( 'Year', 'portfolio-cms' ) );

	$category = (string) get_post_meta( $post->ID, 'category', true );
	$options  = array( 'Games', 'Utilities', 'Apps' );
	echo '<p><label for="category"><strong>' . esc_html__( 'Category', 'portfolio-cms' ) . '</strong></label><br />';
	echo '<select id="category" name="category">';
	foreach ( $options as $option ) {
		printf(
			'<option value="%1$s" %2$s>%1$s</option>',
			esc_attr( $option ),
			selected( $category, $option, false )
		);
	}
	echo '</select></p>';

	portfolio_cms_field_text( $post->ID, 'technologies', __( 'Technologies (CSV)', 'portfolio-cms' ) );
	portfolio_cms_field_text( $post->ID, 'github_url', __( 'GitHub URL', 'portfolio-cms' ) );
	portfolio_cms_field_text( $post->ID, 'live_url', __( 'Live URL', 'portfolio-cms' ) );
	portfolio_cms_field_text( $post->ID, 'accent_color', __( 'Accent color', 'portfolio-cms' ) );

	$featured = (bool) get_post_meta( $post->ID, 'featured', true );
	printf(
		'<p><label><input type="checkbox" name="featured" value="1" %s /> %s</label></p>',
		checked( $featured, true, false ),
		esc_html__( 'Featured', 'portfolio-cms' )
	);

	portfolio_cms_field_textarea( $post->ID, 'summary_en', __( 'Summary (EN)', 'portfolio-cms' ), 4 );
	portfolio_cms_field_textarea( $post->ID, 'summary_fr', __( 'Summary (FR)', 'portfolio-cms' ), 4 );
	portfolio_cms_field_textarea( $post->ID, 'highlights_en', __( 'Highlights EN (one per line)', 'portfolio-cms' ), 5 );
	portfolio_cms_field_textarea( $post->ID, 'highlights_fr', __( 'Highlights FR (one per line)', 'portfolio-cms' ), 5 );
}

/**
 * Save article meta.
 *
 * @param int $post_id Post ID.
 */
function portfolio_cms_save_post_meta( int $post_id ): void {
	if ( ! isset( $_POST['portfolio_cms_post_nonce'] ) ) {
		return;
	}
	if ( ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['portfolio_cms_post_nonce'] ) ), 'portfolio_cms_save_post' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	if ( get_post_type( $post_id ) !== 'portfolio_post' ) {
		return;
	}

	$string_keys = array(
		'title_en',
		'title_fr',
		'post_date',
		'tags',
		'series',
	);
	foreach ( $string_keys as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) );
		}
	}

	foreach ( array( 'description_en', 'description_fr' ) as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, sanitize_textarea_field( wp_unslash( $_POST[ $key ] ) ) );
		}
	}

	foreach ( array( 'content_en', 'content_fr' ) as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, wp_kses_post( wp_unslash( $_POST[ $key ] ) ) );
		}
	}

	if ( isset( $_POST['series_order'] ) ) {
		update_post_meta( $post_id, 'series_order', absint( $_POST['series_order'] ) );
	}
}
add_action( 'save_post_portfolio_post', 'portfolio_cms_save_post_meta' );

/**
 * Save project meta.
 *
 * @param int $post_id Post ID.
 */
function portfolio_cms_save_project_meta( int $post_id ): void {
	if ( ! isset( $_POST['portfolio_cms_project_nonce'] ) ) {
		return;
	}
	if ( ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['portfolio_cms_project_nonce'] ) ), 'portfolio_cms_save_project' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	if ( get_post_type( $post_id ) !== 'portfolio_project' ) {
		return;
	}

	$text_keys = array(
		'project_slug',
		'year',
		'technologies',
		'accent_color',
	);
	foreach ( $text_keys as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) );
		}
	}

	if ( isset( $_POST['category'] ) ) {
		$category = sanitize_text_field( wp_unslash( $_POST['category'] ) );
		if ( in_array( $category, array( 'Games', 'Utilities', 'Apps' ), true ) ) {
			update_post_meta( $post_id, 'category', $category );
		}
	}

	foreach ( array( 'github_url', 'live_url' ) as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, esc_url_raw( wp_unslash( $_POST[ $key ] ) ) );
		}
	}

	foreach ( array( 'summary_en', 'summary_fr', 'highlights_en', 'highlights_fr' ) as $key ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, sanitize_textarea_field( wp_unslash( $_POST[ $key ] ) ) );
		}
	}

	update_post_meta( $post_id, 'featured', ! empty( $_POST['featured'] ) );
}
add_action( 'save_post_portfolio_project', 'portfolio_cms_save_project_meta' );
