<?php
/**
 * Revalidation webhooks to Next.js.
 *
 * @package Portfolio_CMS
 */

declare(strict_types=1);

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * POST revalidate request (non-blocking).
 *
 * @param string[] $tags Cache tags.
 */
function portfolio_cms_trigger_revalidate( array $tags ): void {
	$url    = portfolio_cms_revalidate_url();
	$secret = portfolio_cms_revalidate_secret();

	if ( $url === '' || $secret === '' ) {
		return;
	}

	if ( empty( $tags ) ) {
		$tags = array( 'cms' );
	}

	wp_remote_post(
		$url,
		array(
			'timeout'  => 5,
			'blocking' => false,
			'headers'  => array(
				'Content-Type'       => 'application/json',
				'x-portfolio-secret' => $secret,
			),
			'body'     => wp_json_encode(
				array(
					'tags' => array_values( $tags ),
				)
			),
		)
	);
}

/**
 * On save_post for our CPTs.
 *
 * @param int     $post_id Post ID.
 * @param WP_Post $post    Post object.
 * @param bool    $update  Whether update.
 */
function portfolio_cms_revalidate_on_save_post( int $post_id, WP_Post $post, bool $update ): void {
	unset( $update );

	if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
		return;
	}

	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	$tags = array( 'cms' );

	if ( $post->post_type === 'portfolio_post' ) {
		$tags[] = 'cms-posts';
	} elseif ( $post->post_type === 'portfolio_project' ) {
		$tags[] = 'cms-projects';
	} else {
		return;
	}

	portfolio_cms_trigger_revalidate( $tags );
}
add_action( 'save_post', 'portfolio_cms_revalidate_on_save_post', 20, 3 );

/**
 * On update of portfolio_cms_* options.
 *
 * @param string $option    Option name.
 * @param mixed  $old_value Old value.
 * @param mixed  $value     New value.
 */
function portfolio_cms_revalidate_on_option_update( string $option, $old_value, $value ): void {
	unset( $old_value, $value );

	if ( ! str_starts_with( $option, 'portfolio_cms_' ) ) {
		return;
	}

	// Skip revalidate credential churn noise if desired — still revalidate site.
	$site_options = array(
		'portfolio_cms_identity',
		'portfolio_cms_about',
		'portfolio_cms_series',
		'portfolio_cms_editorial_en',
		'portfolio_cms_editorial_fr',
		'portfolio_cms_allowed_origin',
		'portfolio_cms_revalidate_url',
		'portfolio_cms_revalidate_secret',
	);

	if ( ! in_array( $option, $site_options, true ) ) {
		return;
	}

	portfolio_cms_trigger_revalidate( array( 'cms', 'cms-site' ) );
}
add_action( 'updated_option', 'portfolio_cms_revalidate_on_option_update', 10, 3 );
add_action( 'added_option', 'portfolio_cms_revalidate_on_option_added', 10, 2 );

/**
 * When an option is first added.
 *
 * @param string $option Option name.
 * @param mixed  $value  Value.
 */
function portfolio_cms_revalidate_on_option_added( string $option, $value ): void {
	portfolio_cms_revalidate_on_option_update( $option, null, $value );
}
