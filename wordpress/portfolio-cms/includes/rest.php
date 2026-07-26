<?php
/**
 * REST API routes under portfolio/v1.
 *
 * @package Portfolio_CMS
 */

declare(strict_types=1);

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register REST routes.
 */
function portfolio_cms_register_rest_routes(): void {
	$namespace = 'portfolio/v1';

	register_rest_route(
		$namespace,
		'/posts',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'portfolio_cms_rest_get_posts',
			'permission_callback' => '__return_true',
			'args'                => array(
				'locale' => array(
					'type'              => 'string',
					'required'          => false,
					'sanitize_callback' => 'sanitize_key',
				),
			),
		)
	);

	register_rest_route(
		$namespace,
		'/posts/(?P<slug>[a-z0-9-]+)',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'portfolio_cms_rest_get_post',
			'permission_callback' => '__return_true',
			'args'                => array(
				'slug'   => array(
					'type'              => 'string',
					'required'          => true,
					'sanitize_callback' => 'sanitize_title',
				),
				'locale' => array(
					'type'              => 'string',
					'required'          => false,
					'sanitize_callback' => 'sanitize_key',
				),
			),
		)
	);

	register_rest_route(
		$namespace,
		'/projects',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'portfolio_cms_rest_get_projects',
			'permission_callback' => '__return_true',
			'args'                => array(
				'locale' => array(
					'type'              => 'string',
					'required'          => false,
					'sanitize_callback' => 'sanitize_key',
				),
			),
		)
	);

	register_rest_route(
		$namespace,
		'/site',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'portfolio_cms_rest_get_site',
			'permission_callback' => '__return_true',
			'args'                => array(
				'locale' => array(
					'type'              => 'string',
					'required'          => false,
					'sanitize_callback' => 'sanitize_key',
				),
			),
		)
	);
}
add_action( 'rest_api_init', 'portfolio_cms_register_rest_routes' );

/**
 * Split CSV or array meta into string[].
 *
 * @param mixed $value Meta value.
 * @return string[]
 */
function portfolio_cms_split_list( $value ): array {
	if ( is_array( $value ) ) {
		return array_values( array_filter( array_map( 'strval', $value ) ) );
	}
	if ( ! is_string( $value ) || $value === '' ) {
		return array();
	}
	$parts = array_map( 'trim', explode( ',', $value ) );
	return array_values( array_filter( $parts, static fn( string $p ): bool => $p !== '' ) );
}

/**
 * Newline-separated highlights to array.
 *
 * @param mixed $value Meta.
 * @return string[]
 */
function portfolio_cms_split_lines( $value ): array {
	if ( is_array( $value ) ) {
		return array_values( array_filter( array_map( 'strval', $value ) ) );
	}
	if ( ! is_string( $value ) || $value === '' ) {
		return array();
	}
	$lines = preg_split( '/\r\n|\r|\n/', $value ) ?: array();
	return array_values(
		array_filter(
			array_map( 'trim', $lines ),
			static fn( string $line ): bool => $line !== ''
		)
	);
}

/**
 * Map a portfolio_post to API DTO.
 *
 * @param WP_Post $post Post.
 * @return array<string, mixed>
 */
function portfolio_cms_format_post( WP_Post $post ): array {
	$meta_date = (string) get_post_meta( $post->ID, 'post_date', true );
	$date      = $meta_date !== '' ? $meta_date : gmdate( 'Y-m-d', strtotime( $post->post_date_gmt ?: $post->post_date ) );

	$series       = (string) get_post_meta( $post->ID, 'series', true );
	$series_order = (int) get_post_meta( $post->ID, 'series_order', true );

	$dto = array(
		'slug'        => $post->post_name,
		'date'        => $date,
		'tags'        => portfolio_cms_split_list( get_post_meta( $post->ID, 'tags', true ) ),
		'title'       => array(
			'en' => (string) get_post_meta( $post->ID, 'title_en', true ),
			'fr' => (string) get_post_meta( $post->ID, 'title_fr', true ),
		),
		'description' => array(
			'en' => (string) get_post_meta( $post->ID, 'description_en', true ),
			'fr' => (string) get_post_meta( $post->ID, 'description_fr', true ),
		),
		'content'     => array(
			'en' => wp_kses_post( (string) get_post_meta( $post->ID, 'content_en', true ) ),
			'fr' => wp_kses_post( (string) get_post_meta( $post->ID, 'content_fr', true ) ),
		),
	);

	if ( $series !== '' ) {
		$dto['series'] = $series;
	}
	if ( $series_order > 0 ) {
		$dto['seriesOrder'] = $series_order;
	}

	return $dto;
}

/**
 * Map a portfolio_project to API DTO.
 *
 * @param WP_Post $post Post.
 * @return array<string, mixed>
 */
function portfolio_cms_format_project( WP_Post $post ): array {
	$slug_meta = (string) get_post_meta( $post->ID, 'project_slug', true );
	$slug      = $slug_meta !== '' ? $slug_meta : $post->post_name;

	$github = (string) get_post_meta( $post->ID, 'github_url', true );
	$live   = (string) get_post_meta( $post->ID, 'live_url', true );
	$featured = (bool) get_post_meta( $post->ID, 'featured', true );

	$dto = array(
		'slug'         => $slug,
		'title'        => $post->post_title,
		'year'         => (string) get_post_meta( $post->ID, 'year', true ),
		'category'     => (string) get_post_meta( $post->ID, 'category', true ),
		'technologies' => portfolio_cms_split_list( get_post_meta( $post->ID, 'technologies', true ) ),
		'accentColor'  => (string) get_post_meta( $post->ID, 'accent_color', true ),
		'summary'      => array(
			'en' => (string) get_post_meta( $post->ID, 'summary_en', true ),
			'fr' => (string) get_post_meta( $post->ID, 'summary_fr', true ),
		),
		'highlights'   => array(
			'en' => portfolio_cms_split_lines( get_post_meta( $post->ID, 'highlights_en', true ) ),
			'fr' => portfolio_cms_split_lines( get_post_meta( $post->ID, 'highlights_fr', true ) ),
		),
	);

	if ( $github !== '' ) {
		$dto['githubUrl'] = $github;
	}
	if ( $live !== '' ) {
		$dto['liveUrl'] = $live;
	}
	if ( $featured ) {
		$dto['featured'] = true;
	}

	return $dto;
}

/**
 * GET /posts
 *
 * @param WP_REST_Request $request Request.
 * @return WP_REST_Response
 */
function portfolio_cms_rest_get_posts( WP_REST_Request $request ): WP_REST_Response {
	unset( $request ); // locale accepted for future use.

	$query = new WP_Query(
		array(
			'post_type'      => 'portfolio_post',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'orderby'        => 'date',
			'order'          => 'DESC',
			'no_found_rows'  => true,
		)
	);

	$items = array_map( 'portfolio_cms_format_post', $query->posts );
	return new WP_REST_Response( $items, 200 );
}

/**
 * GET /posts/{slug}
 *
 * @param WP_REST_Request $request Request.
 * @return WP_REST_Response|WP_Error
 */
function portfolio_cms_rest_get_post( WP_REST_Request $request ) {
	$slug = (string) $request['slug'];

	$query = new WP_Query(
		array(
			'post_type'      => 'portfolio_post',
			'post_status'    => 'publish',
			'name'           => $slug,
			'posts_per_page' => 1,
			'no_found_rows'  => true,
		)
	);

	if ( empty( $query->posts ) ) {
		return new WP_Error(
			'portfolio_cms_not_found',
			__( 'Post not found.', 'portfolio-cms' ),
			array( 'status' => 404 )
		);
	}

	return new WP_REST_Response( portfolio_cms_format_post( $query->posts[0] ), 200 );
}

/**
 * GET /projects
 *
 * @param WP_REST_Request $request Request.
 * @return WP_REST_Response
 */
function portfolio_cms_rest_get_projects( WP_REST_Request $request ): WP_REST_Response {
	unset( $request );

	$query = new WP_Query(
		array(
			'post_type'      => 'portfolio_project',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'orderby'        => array(
				'menu_order' => 'ASC',
				'title'      => 'ASC',
			),
			'no_found_rows'  => true,
		)
	);

	$items = array_map( 'portfolio_cms_format_project', $query->posts );
	return new WP_REST_Response( $items, 200 );
}

/**
 * GET /site
 *
 * @param WP_REST_Request $request Request.
 * @return WP_REST_Response
 */
function portfolio_cms_rest_get_site( WP_REST_Request $request ): WP_REST_Response {
	unset( $request );

	$identity = portfolio_cms_get_array_option( 'portfolio_cms_identity', portfolio_cms_default_identity() );
	$about    = portfolio_cms_get_array_option( 'portfolio_cms_about', portfolio_cms_default_about() );
	$series   = portfolio_cms_get_array_option( 'portfolio_cms_series', array() );
	$ed_en    = portfolio_cms_get_array_option( 'portfolio_cms_editorial_en', portfolio_cms_default_editorial() );
	$ed_fr    = portfolio_cms_get_array_option( 'portfolio_cms_editorial_fr', portfolio_cms_default_editorial() );

	return new WP_REST_Response(
		array(
			'identity'  => $identity,
			'about'     => $about,
			'series'    => $series,
			'editorial' => array(
				'en' => $ed_en,
				'fr' => $ed_fr,
			),
		),
		200
	);
}
