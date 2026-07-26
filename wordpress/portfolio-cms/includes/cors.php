<?php
/**
 * CORS headers for portfolio/v1 REST routes.
 *
 * @package Portfolio_CMS
 */

declare(strict_types=1);

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Whether the current REST request targets portfolio/v1.
 *
 * @return bool
 */
function portfolio_cms_is_portfolio_rest_request(): bool {
	if ( empty( $GLOBALS['wp']->query_vars['rest_route'] ) ) {
		$uri = isset( $_SERVER['REQUEST_URI'] ) ? (string) wp_unslash( $_SERVER['REQUEST_URI'] ) : '';
		return (bool) preg_match( '#/wp-json/portfolio/v1(/|$)#', $uri );
	}

	$route = (string) $GLOBALS['wp']->query_vars['rest_route'];
	return str_starts_with( $route, '/portfolio/v1' );
}

/**
 * Send CORS headers for allowed origin on portfolio routes.
 */
function portfolio_cms_send_cors_headers(): void {
	if ( ! portfolio_cms_is_portfolio_rest_request() ) {
		return;
	}

	$allowed = portfolio_cms_allowed_origin();
	$origin  = isset( $_SERVER['HTTP_ORIGIN'] ) ? (string) wp_unslash( $_SERVER['HTTP_ORIGIN'] ) : '';

	if ( $origin !== '' && $origin === $allowed ) {
		header( 'Access-Control-Allow-Origin: ' . $allowed );
		header( 'Vary: Origin' );
	} elseif ( $allowed !== '' ) {
		// Still advertise the configured origin for simple GET from Next server components
		// that may not send Origin; browsers will enforce match when Origin is present.
		header( 'Access-Control-Allow-Origin: ' . $allowed );
		header( 'Vary: Origin' );
	}

	header( 'Access-Control-Allow-Methods: GET, OPTIONS' );
	header( 'Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce' );
	header( 'Access-Control-Max-Age: 86400' );
}

/**
 * Handle OPTIONS preflight early.
 */
function portfolio_cms_handle_options(): void {
	if ( ( $_SERVER['REQUEST_METHOD'] ?? '' ) !== 'OPTIONS' ) {
		return;
	}
	if ( ! portfolio_cms_is_portfolio_rest_request() ) {
		return;
	}

	portfolio_cms_send_cors_headers();
	status_header( 204 );
	exit;
}
add_action( 'rest_api_init', 'portfolio_cms_send_cors_headers', 15 );
add_action( 'init', 'portfolio_cms_handle_options', 0 );

/**
 * Ensure CORS also applied via rest_pre_serve_request.
 *
 * @param bool             $served  Whether served.
 * @param WP_HTTP_Response $result  Result.
 * @param WP_REST_Request  $request Request.
 * @return bool
 */
function portfolio_cms_rest_cors( bool $served, $result, WP_REST_Request $request ): bool {
	$route = $request->get_route();
	if ( ! str_starts_with( $route, '/portfolio/v1' ) ) {
		return $served;
	}

	portfolio_cms_send_cors_headers();
	return $served;
}
add_filter( 'rest_pre_serve_request', 'portfolio_cms_rest_cors', 10, 3 );
