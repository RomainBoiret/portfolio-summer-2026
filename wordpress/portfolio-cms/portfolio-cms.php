<?php
/**
 * Plugin Name:       Portfolio CMS
 * Plugin URI:        https://romainboiret.com
 * Description:       Headless CMS for a bilingual Next.js portfolio (EN/FR fields, no Polylang).
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      8.0
 * Author:            Romain Boiret
 * License:           GPL-2.0-or-later
 * Text Domain:       portfolio-cms
 *
 * @package Portfolio_CMS
 */

declare(strict_types=1);

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'PORTFOLIO_CMS_VERSION', '1.0.0' );
define( 'PORTFOLIO_CMS_PATH', plugin_dir_path( __FILE__ ) );
define( 'PORTFOLIO_CMS_URL', plugin_dir_url( __FILE__ ) );

/**
 * Filterable allowed CORS origin for the Next.js front end.
 *
 * @return string
 */
function portfolio_cms_allowed_origin(): string {
	$default = 'https://romainboiret.com';
	$option  = get_option( 'portfolio_cms_allowed_origin', $default );

	/**
	 * Filters the allowed CORS origin.
	 *
	 * @param string $origin Allowed origin URL.
	 */
	return (string) apply_filters( 'portfolio_cms_allowed_origin', $option ?: $default );
}

/**
 * Next.js revalidate endpoint URL.
 *
 * @return string
 */
function portfolio_cms_revalidate_url(): string {
	return (string) get_option( 'portfolio_cms_revalidate_url', '' );
}

/**
 * Shared secret sent as x-portfolio-secret.
 *
 * @return string
 */
function portfolio_cms_revalidate_secret(): string {
	return (string) get_option( 'portfolio_cms_revalidate_secret', '' );
}

require_once PORTFOLIO_CMS_PATH . 'includes/cpt.php';
require_once PORTFOLIO_CMS_PATH . 'includes/meta.php';
require_once PORTFOLIO_CMS_PATH . 'includes/options.php';
require_once PORTFOLIO_CMS_PATH . 'includes/rest.php';
require_once PORTFOLIO_CMS_PATH . 'includes/cors.php';
require_once PORTFOLIO_CMS_PATH . 'includes/webhook.php';
require_once PORTFOLIO_CMS_PATH . 'includes/seed.php';

/**
 * Flush rewrite rules on activation.
 */
function portfolio_cms_activate(): void {
	portfolio_cms_register_cpts();
	flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'portfolio_cms_activate' );

/**
 * Flush rewrite rules on deactivation.
 */
function portfolio_cms_deactivate(): void {
	flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'portfolio_cms_deactivate' );
