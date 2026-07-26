<?php
/**
 * Custom post types.
 *
 * @package Portfolio_CMS
 */

declare(strict_types=1);

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register portfolio CPTs.
 */
function portfolio_cms_register_cpts(): void {
	register_post_type(
		'portfolio_project',
		array(
			'labels'              => array(
				'name'          => __( 'Projects', 'portfolio-cms' ),
				'singular_name' => __( 'Project', 'portfolio-cms' ),
				'add_new_item'  => __( 'Add New Project', 'portfolio-cms' ),
				'edit_item'     => __( 'Edit Project', 'portfolio-cms' ),
				'menu_name'     => __( 'Projects', 'portfolio-cms' ),
			),
			'public'              => false,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'show_in_rest'        => true,
			'menu_icon'           => 'dashicons-portfolio',
			'menu_position'       => 21,
			'supports'            => array( 'title', 'custom-fields', 'page-attributes' ),
			'has_archive'         => false,
			'rewrite'             => false,
			'capability_type'     => 'post',
		)
	);

	register_post_type(
		'portfolio_post',
		array(
			'labels'              => array(
				'name'          => __( 'Articles', 'portfolio-cms' ),
				'singular_name' => __( 'Article', 'portfolio-cms' ),
				'add_new_item'  => __( 'Add New Article', 'portfolio-cms' ),
				'edit_item'     => __( 'Edit Article', 'portfolio-cms' ),
				'menu_name'     => __( 'Articles', 'portfolio-cms' ),
			),
			'public'              => false,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'show_in_rest'        => true,
			'menu_icon'           => 'dashicons-edit',
			'menu_position'       => 22,
			'supports'            => array( 'title', 'custom-fields' ),
			'has_archive'         => false,
			'rewrite'             => false,
			'capability_type'     => 'post',
		)
	);
}
add_action( 'init', 'portfolio_cms_register_cpts' );
