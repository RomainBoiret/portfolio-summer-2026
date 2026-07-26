<?php
/**
 * Settings page and option helpers.
 *
 * @package Portfolio_CMS
 */

declare(strict_types=1);

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Default empty editorial structure.
 *
 * @return array<string, mixed>
 */
function portfolio_cms_default_editorial(): array {
	return array(
		'meta'     => array(
			'role'        => '',
			'description' => '',
			'keywords'    => array(),
		),
		'site'     => array(
			'tagline'  => '',
			'roleLine' => '',
			'location' => '',
		),
		'about'    => array(
			'title'       => '',
			'headline'    => '',
			'paragraphs'  => array( '', '' ),
			'focusTitle'  => '',
			'focus'       => array(),
			'education'   => '',
			'involvement' => '',
			'clubRole'    => '',
			'clubBlurb'   => '',
			'skills'      => '',
			'degree'      => '',
			'present'     => '',
		),
		'projects' => array(
			'title'        => '',
			'selectedWork' => '',
			'moreWork'     => '',
			'githubStats'  => array(
				'label' => '',
				'blurb' => '',
			),
		),
		'contact'  => array(
			'title' => '',
			'blurb' => '',
		),
		'footer'   => array(
			'availability'  => '',
			'builtWithCare' => '',
		),
		'blog'     => array(
			'title'           => '',
			'blurb'           => '',
			'homeTeaser'      => '',
			'metaDescription' => '',
			'empty'           => '',
		),
	);
}

/**
 * Default identity.
 *
 * @return array<string, mixed>
 */
function portfolio_cms_default_identity(): array {
	return array(
		'name'   => '',
		'email'  => '',
		'url'    => '',
		'social' => array(
			array(
				'labelKey' => 'email',
				'href'     => '',
				'icon'     => 'email',
			),
			array(
				'labelKey' => 'github',
				'href'     => '',
				'icon'     => 'github',
			),
			array(
				'labelKey' => 'linkedin',
				'href'     => '',
				'icon'     => 'linkedin',
			),
			array(
				'labelKey' => 'instagram',
				'href'     => '',
				'icon'     => 'instagram',
			),
		),
	);
}

/**
 * Default about block.
 *
 * @return array<string, mixed>
 */
function portfolio_cms_default_about(): array {
	return array(
		'education' => array(),
		'club'      => array(
			'name' => '',
			'url'  => '',
		),
		'skills'    => array(),
	);
}

/**
 * Register settings.
 */
function portfolio_cms_register_settings(): void {
	register_setting(
		'portfolio_cms_settings',
		'portfolio_cms_identity',
		array(
			'type'              => 'array',
			'sanitize_callback' => 'portfolio_cms_sanitize_identity',
			'default'           => portfolio_cms_default_identity(),
		)
	);
	register_setting(
		'portfolio_cms_settings',
		'portfolio_cms_about',
		array(
			'type'              => 'array',
			'sanitize_callback' => 'portfolio_cms_sanitize_about',
			'default'           => portfolio_cms_default_about(),
		)
	);
	register_setting(
		'portfolio_cms_settings',
		'portfolio_cms_series',
		array(
			'type'              => 'array',
			'sanitize_callback' => 'portfolio_cms_sanitize_series',
			'default'           => array(),
		)
	);
	register_setting(
		'portfolio_cms_settings',
		'portfolio_cms_editorial_en',
		array(
			'type'              => 'array',
			'sanitize_callback' => 'portfolio_cms_sanitize_editorial',
			'default'           => portfolio_cms_default_editorial(),
		)
	);
	register_setting(
		'portfolio_cms_settings',
		'portfolio_cms_editorial_fr',
		array(
			'type'              => 'array',
			'sanitize_callback' => 'portfolio_cms_sanitize_editorial',
			'default'           => portfolio_cms_default_editorial(),
		)
	);
	register_setting(
		'portfolio_cms_settings',
		'portfolio_cms_revalidate_url',
		array(
			'type'              => 'string',
			'sanitize_callback' => 'esc_url_raw',
			'default'           => '',
		)
	);
	register_setting(
		'portfolio_cms_settings',
		'portfolio_cms_revalidate_secret',
		array(
			'type'              => 'string',
			'sanitize_callback' => 'sanitize_text_field',
			'default'           => '',
		)
	);
	register_setting(
		'portfolio_cms_settings',
		'portfolio_cms_allowed_origin',
		array(
			'type'              => 'string',
			'sanitize_callback' => 'esc_url_raw',
			'default'           => 'https://romainboiret.com',
		)
	);
}
add_action( 'admin_init', 'portfolio_cms_register_settings' );

/**
 * @param mixed $value Raw.
 * @return array<string, mixed>
 */
function portfolio_cms_sanitize_identity( $value ): array {
	if ( ! is_array( $value ) ) {
		return portfolio_cms_default_identity();
	}

	$social_in = isset( $value['social'] ) && is_array( $value['social'] ) ? $value['social'] : array();
	$social    = array();
	$keys      = array( 'email', 'github', 'linkedin', 'instagram' );

	foreach ( $keys as $index => $key ) {
		$item = isset( $social_in[ $index ] ) && is_array( $social_in[ $index ] ) ? $social_in[ $index ] : array();
		// Also accept keyed by labelKey from form fields.
		if ( isset( $value[ 'social_' . $key ] ) ) {
			$item['href'] = $value[ 'social_' . $key ];
		}
		$href = isset( $item['href'] ) ? (string) $item['href'] : '';
		$social[] = array(
			'labelKey' => $key,
			'href'     => ( str_starts_with( $href, 'mailto:' ) ) ? sanitize_text_field( $href ) : esc_url_raw( $href ),
			'icon'     => $key,
		);
	}

	return array(
		'name'   => sanitize_text_field( (string) ( $value['name'] ?? '' ) ),
		'email'  => sanitize_email( (string) ( $value['email'] ?? '' ) ),
		'url'    => esc_url_raw( (string) ( $value['url'] ?? '' ) ),
		'social' => $social,
	);
}

/**
 * @param mixed $value Raw.
 * @return array<string, mixed>
 */
function portfolio_cms_sanitize_about( $value ): array {
	if ( ! is_array( $value ) ) {
		return portfolio_cms_default_about();
	}

	$education_rows = array();
	if ( ! empty( $value['education'] ) && is_array( $value['education'] ) ) {
		$education_rows = $value['education'];
	} elseif ( ! empty( $value['education_json'] ) && is_string( $value['education_json'] ) ) {
		$decoded = json_decode( wp_unslash( $value['education_json'] ), true );
		if ( is_array( $decoded ) ) {
			$education_rows = $decoded;
		}
	}

	$education = array();
	foreach ( $education_rows as $row ) {
		if ( ! is_array( $row ) ) {
			continue;
		}
		$education[] = array(
			'id'        => sanitize_key( (string) ( $row['id'] ?? '' ) ),
			'school'    => sanitize_text_field( (string) ( $row['school'] ?? '' ) ),
			'startDate' => sanitize_text_field( (string) ( $row['startDate'] ?? '' ) ),
		);
	}

	$skills_raw = $value['skills'] ?? array();
	if ( is_string( $skills_raw ) ) {
		$skills = array_values(
			array_filter(
				array_map( 'trim', explode( ',', $skills_raw ) )
			)
		);
	} elseif ( is_array( $skills_raw ) ) {
		$skills = array_map( 'sanitize_text_field', $skills_raw );
	} else {
		$skills = array();
	}

	$club = isset( $value['club'] ) && is_array( $value['club'] ) ? $value['club'] : array();

	return array(
		'education' => $education,
		'club'      => array(
			'name' => sanitize_text_field( (string) ( $club['name'] ?? $value['club_name'] ?? '' ) ),
			'url'  => esc_url_raw( (string) ( $club['url'] ?? $value['club_url'] ?? '' ) ),
		),
		'skills'    => array_map( 'sanitize_text_field', $skills ),
	);
}

/**
 * @param mixed $value Raw.
 * @return array<string, array{en: string, fr: string}>
 */
function portfolio_cms_sanitize_series( $value ): array {
	if ( ! is_array( $value ) ) {
		return array();
	}

	// Form may submit JSON string in series_json.
	if ( isset( $value['series_json'] ) && is_string( $value['series_json'] ) ) {
		$decoded = json_decode( wp_unslash( $value['series_json'] ), true );
		$value   = is_array( $decoded ) ? $decoded : array();
	}

	$out = array();
	foreach ( $value as $id => $labels ) {
		if ( ! is_array( $labels ) ) {
			continue;
		}
		$key         = sanitize_key( (string) $id );
		$out[ $key ] = array(
			'en' => sanitize_text_field( (string) ( $labels['en'] ?? '' ) ),
			'fr' => sanitize_text_field( (string) ( $labels['fr'] ?? '' ) ),
		);
	}
	return $out;
}

/**
 * Lines from textarea to string array.
 *
 * @param mixed $value Raw.
 * @return string[]
 */
function portfolio_cms_lines_to_array( $value ): array {
	if ( is_array( $value ) ) {
		return array_values( array_filter( array_map( 'sanitize_text_field', $value ) ) );
	}
	if ( ! is_string( $value ) ) {
		return array();
	}
	$lines = preg_split( '/\r\n|\r|\n/', $value ) ?: array();
	return array_values(
		array_filter(
			array_map(
				static function ( string $line ): string {
					return sanitize_text_field( $line );
				},
				$lines
			)
		)
	);
}

/**
 * @param mixed $value Raw.
 * @return array<string, mixed>
 */
function portfolio_cms_sanitize_editorial( $value ): array {
	if ( ! is_array( $value ) ) {
		return portfolio_cms_default_editorial();
	}

	// Allow full JSON paste.
	if ( isset( $value['editorial_json'] ) && is_string( $value['editorial_json'] ) && $value['editorial_json'] !== '' ) {
		$decoded = json_decode( wp_unslash( $value['editorial_json'] ), true );
		if ( is_array( $decoded ) ) {
			$value = $decoded;
		}
	}

	$base = portfolio_cms_default_editorial();

	$meta = isset( $value['meta'] ) && is_array( $value['meta'] ) ? $value['meta'] : array();
	$site = isset( $value['site'] ) && is_array( $value['site'] ) ? $value['site'] : array();
	$about = isset( $value['about'] ) && is_array( $value['about'] ) ? $value['about'] : array();
	$projects = isset( $value['projects'] ) && is_array( $value['projects'] ) ? $value['projects'] : array();
	$contact = isset( $value['contact'] ) && is_array( $value['contact'] ) ? $value['contact'] : array();
	$footer = isset( $value['footer'] ) && is_array( $value['footer'] ) ? $value['footer'] : array();
	$blog = isset( $value['blog'] ) && is_array( $value['blog'] ) ? $value['blog'] : array();

	$keywords = $meta['keywords'] ?? array();
	if ( is_string( $keywords ) ) {
		$keywords = portfolio_cms_lines_to_array( $keywords );
	} elseif ( is_array( $keywords ) ) {
		$keywords = array_map( 'sanitize_text_field', $keywords );
	} else {
		$keywords = array();
	}

	$paragraphs = $about['paragraphs'] ?? array( '', '' );
	if ( is_array( $paragraphs ) ) {
		$p0 = sanitize_textarea_field( (string) ( $paragraphs[0] ?? '' ) );
		$p1 = sanitize_textarea_field( (string) ( $paragraphs[1] ?? '' ) );
	} else {
		$p0 = '';
		$p1 = '';
	}

	$focus = $about['focus'] ?? array();
	if ( is_string( $focus ) ) {
		$focus = portfolio_cms_lines_to_array( $focus );
	} elseif ( is_array( $focus ) ) {
		$focus = array_map( 'sanitize_text_field', $focus );
	} else {
		$focus = array();
	}

	$gh = isset( $projects['githubStats'] ) && is_array( $projects['githubStats'] ) ? $projects['githubStats'] : array();

	return array(
		'meta'     => array(
			'role'        => sanitize_text_field( (string) ( $meta['role'] ?? '' ) ),
			'description' => sanitize_textarea_field( (string) ( $meta['description'] ?? '' ) ),
			'keywords'    => array_values( $keywords ),
		),
		'site'     => array(
			'tagline'  => sanitize_text_field( (string) ( $site['tagline'] ?? '' ) ),
			'roleLine' => sanitize_text_field( (string) ( $site['roleLine'] ?? '' ) ),
			'location' => sanitize_text_field( (string) ( $site['location'] ?? '' ) ),
		),
		'about'    => array(
			'title'       => sanitize_text_field( (string) ( $about['title'] ?? '' ) ),
			'headline'    => sanitize_text_field( (string) ( $about['headline'] ?? '' ) ),
			'paragraphs'  => array( $p0, $p1 ),
			'focusTitle'  => sanitize_text_field( (string) ( $about['focusTitle'] ?? '' ) ),
			'focus'       => array_values( $focus ),
			'education'   => sanitize_text_field( (string) ( $about['education'] ?? '' ) ),
			'involvement' => sanitize_text_field( (string) ( $about['involvement'] ?? '' ) ),
			'clubRole'    => sanitize_text_field( (string) ( $about['clubRole'] ?? '' ) ),
			'clubBlurb'   => sanitize_textarea_field( (string) ( $about['clubBlurb'] ?? '' ) ),
			'skills'      => sanitize_text_field( (string) ( $about['skills'] ?? '' ) ),
			'degree'      => sanitize_text_field( (string) ( $about['degree'] ?? '' ) ),
			'present'     => sanitize_text_field( (string) ( $about['present'] ?? '' ) ),
		),
		'projects' => array(
			'title'        => sanitize_text_field( (string) ( $projects['title'] ?? '' ) ),
			'selectedWork' => sanitize_text_field( (string) ( $projects['selectedWork'] ?? '' ) ),
			'moreWork'     => sanitize_text_field( (string) ( $projects['moreWork'] ?? '' ) ),
			'githubStats'  => array(
				'label' => sanitize_text_field( (string) ( $gh['label'] ?? '' ) ),
				'blurb' => sanitize_textarea_field( (string) ( $gh['blurb'] ?? '' ) ),
			),
		),
		'contact'  => array(
			'title' => sanitize_text_field( (string) ( $contact['title'] ?? '' ) ),
			'blurb' => sanitize_textarea_field( (string) ( $contact['blurb'] ?? '' ) ),
		),
		'footer'   => array(
			'availability'  => sanitize_text_field( (string) ( $footer['availability'] ?? '' ) ),
			'builtWithCare' => sanitize_text_field( (string) ( $footer['builtWithCare'] ?? '' ) ),
		),
		'blog'     => array(
			'title'           => sanitize_text_field( (string) ( $blog['title'] ?? '' ) ),
			'blurb'           => sanitize_textarea_field( (string) ( $blog['blurb'] ?? '' ) ),
			'homeTeaser'      => sanitize_text_field( (string) ( $blog['homeTeaser'] ?? '' ) ),
			'metaDescription' => sanitize_textarea_field( (string) ( $blog['metaDescription'] ?? '' ) ),
			'empty'           => sanitize_text_field( (string) ( $blog['empty'] ?? '' ) ),
		),
	);
}

/**
 * Get option as array with default.
 *
 * @param string               $key     Option key.
 * @param array<string, mixed> $default Default.
 * @return array<string, mixed>
 */
function portfolio_cms_get_array_option( string $key, array $default ): array {
	$value = get_option( $key, $default );
	return is_array( $value ) ? $value : $default;
}

/**
 * Add top-level admin menu.
 */
function portfolio_cms_admin_menu(): void {
	add_menu_page(
		__( 'Portfolio CMS', 'portfolio-cms' ),
		__( 'Portfolio CMS', 'portfolio-cms' ),
		'manage_options',
		'portfolio-cms',
		'portfolio_cms_render_settings_page',
		'dashicons-admin-site-alt3',
		58
	);
}
add_action( 'admin_menu', 'portfolio_cms_admin_menu' );

/**
 * Render settings page.
 */
function portfolio_cms_render_settings_page(): void {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$identity = portfolio_cms_get_array_option( 'portfolio_cms_identity', portfolio_cms_default_identity() );
	$about    = portfolio_cms_get_array_option( 'portfolio_cms_about', portfolio_cms_default_about() );
	$series   = portfolio_cms_get_array_option( 'portfolio_cms_series', array() );
	$ed_en    = portfolio_cms_get_array_option( 'portfolio_cms_editorial_en', portfolio_cms_default_editorial() );
	$ed_fr    = portfolio_cms_get_array_option( 'portfolio_cms_editorial_fr', portfolio_cms_default_editorial() );

	$social = isset( $identity['social'] ) && is_array( $identity['social'] ) ? $identity['social'] : array();
	$hrefs  = array(
		'email'     => '',
		'github'    => '',
		'linkedin'  => '',
		'instagram' => '',
	);
	foreach ( $social as $item ) {
		if ( is_array( $item ) && ! empty( $item['labelKey'] ) ) {
			$hrefs[ (string) $item['labelKey'] ] = (string) ( $item['href'] ?? '' );
		}
	}

	$skills_csv = isset( $about['skills'] ) && is_array( $about['skills'] )
		? implode( ', ', $about['skills'] )
		: '';
	$education_json = wp_json_encode( $about['education'] ?? array(), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
	$series_json    = wp_json_encode( $series, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
	$ed_en_json     = wp_json_encode( $ed_en, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
	$ed_fr_json     = wp_json_encode( $ed_fr, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );

	?>
	<div class="wrap">
		<h1><?php echo esc_html__( 'Portfolio CMS', 'portfolio-cms' ); ?></h1>

		<form method="post" action="options.php">
			<?php settings_fields( 'portfolio_cms_settings' ); ?>

			<h2><?php echo esc_html__( 'Identity', 'portfolio-cms' ); ?></h2>
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row"><label for="portfolio_cms_identity_name"><?php echo esc_html__( 'Name', 'portfolio-cms' ); ?></label></th>
					<td><input class="regular-text" type="text" id="portfolio_cms_identity_name" name="portfolio_cms_identity[name]" value="<?php echo esc_attr( (string) ( $identity['name'] ?? '' ) ); ?>" /></td>
				</tr>
				<tr>
					<th scope="row"><label for="portfolio_cms_identity_email"><?php echo esc_html__( 'Email', 'portfolio-cms' ); ?></label></th>
					<td><input class="regular-text" type="email" id="portfolio_cms_identity_email" name="portfolio_cms_identity[email]" value="<?php echo esc_attr( (string) ( $identity['email'] ?? '' ) ); ?>" /></td>
				</tr>
				<tr>
					<th scope="row"><label for="portfolio_cms_identity_url"><?php echo esc_html__( 'URL', 'portfolio-cms' ); ?></label></th>
					<td><input class="regular-text" type="url" id="portfolio_cms_identity_url" name="portfolio_cms_identity[url]" value="<?php echo esc_attr( (string) ( $identity['url'] ?? '' ) ); ?>" /></td>
				</tr>
				<?php foreach ( array( 'email', 'github', 'linkedin', 'instagram' ) as $social_key ) : ?>
					<tr>
						<th scope="row"><label for="social_<?php echo esc_attr( $social_key ); ?>"><?php echo esc_html( sprintf( /* translators: social network key */ __( 'Social: %s', 'portfolio-cms' ), $social_key ) ); ?></label></th>
						<td><input class="regular-text" type="text" id="social_<?php echo esc_attr( $social_key ); ?>" name="portfolio_cms_identity[social_<?php echo esc_attr( $social_key ); ?>]" value="<?php echo esc_attr( $hrefs[ $social_key ] ); ?>" /></td>
					</tr>
				<?php endforeach; ?>
			</table>

			<h2><?php echo esc_html__( 'About', 'portfolio-cms' ); ?></h2>
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row"><label for="education_json"><?php echo esc_html__( 'Education (JSON)', 'portfolio-cms' ); ?></label></th>
					<td><textarea class="large-text code" rows="6" id="education_json" name="portfolio_cms_about[education_json]"><?php echo esc_textarea( (string) $education_json ); ?></textarea></td>
				</tr>
				<tr>
					<th scope="row"><label for="club_name"><?php echo esc_html__( 'Club name', 'portfolio-cms' ); ?></label></th>
					<td><input class="regular-text" type="text" id="club_name" name="portfolio_cms_about[club_name]" value="<?php echo esc_attr( (string) ( $about['club']['name'] ?? '' ) ); ?>" /></td>
				</tr>
				<tr>
					<th scope="row"><label for="club_url"><?php echo esc_html__( 'Club URL', 'portfolio-cms' ); ?></label></th>
					<td><input class="regular-text" type="url" id="club_url" name="portfolio_cms_about[club_url]" value="<?php echo esc_attr( (string) ( $about['club']['url'] ?? '' ) ); ?>" /></td>
				</tr>
				<tr>
					<th scope="row"><label for="skills_csv"><?php echo esc_html__( 'Skills (CSV)', 'portfolio-cms' ); ?></label></th>
					<td><input class="large-text" type="text" id="skills_csv" name="portfolio_cms_about[skills]" value="<?php echo esc_attr( $skills_csv ); ?>" /></td>
				</tr>
			</table>

			<h2><?php echo esc_html__( 'Series', 'portfolio-cms' ); ?></h2>
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row"><label for="series_json"><?php echo esc_html__( 'Series map (JSON)', 'portfolio-cms' ); ?></label></th>
					<td><textarea class="large-text code" rows="6" id="series_json" name="portfolio_cms_series[series_json]"><?php echo esc_textarea( (string) $series_json ); ?></textarea>
					<p class="description"><?php echo esc_html__( 'Shape: { "portfolio-notes": { "en": "...", "fr": "..." } }', 'portfolio-cms' ); ?></p></td>
				</tr>
			</table>

			<h2><?php echo esc_html__( 'Editorial EN', 'portfolio-cms' ); ?></h2>
			<?php portfolio_cms_render_editorial_fields( 'portfolio_cms_editorial_en', $ed_en, (string) $ed_en_json ); ?>

			<h2><?php echo esc_html__( 'Editorial FR', 'portfolio-cms' ); ?></h2>
			<?php portfolio_cms_render_editorial_fields( 'portfolio_cms_editorial_fr', $ed_fr, (string) $ed_fr_json ); ?>

			<h2><?php echo esc_html__( 'Revalidate', 'portfolio-cms' ); ?></h2>
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row"><label for="portfolio_cms_revalidate_url"><?php echo esc_html__( 'Revalidate URL', 'portfolio-cms' ); ?></label></th>
					<td><input class="regular-text" type="url" id="portfolio_cms_revalidate_url" name="portfolio_cms_revalidate_url" value="<?php echo esc_attr( portfolio_cms_revalidate_url() ); ?>" /></td>
				</tr>
				<tr>
					<th scope="row"><label for="portfolio_cms_revalidate_secret"><?php echo esc_html__( 'Revalidate secret', 'portfolio-cms' ); ?></label></th>
					<td><input class="regular-text" type="text" id="portfolio_cms_revalidate_secret" name="portfolio_cms_revalidate_secret" value="<?php echo esc_attr( portfolio_cms_revalidate_secret() ); ?>" autocomplete="off" /></td>
				</tr>
			</table>

			<h2><?php echo esc_html__( 'CORS', 'portfolio-cms' ); ?></h2>
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row"><label for="portfolio_cms_allowed_origin"><?php echo esc_html__( 'Allowed origin', 'portfolio-cms' ); ?></label></th>
					<td><input class="regular-text" type="url" id="portfolio_cms_allowed_origin" name="portfolio_cms_allowed_origin" value="<?php echo esc_attr( (string) get_option( 'portfolio_cms_allowed_origin', 'https://romainboiret.com' ) ); ?>" /></td>
				</tr>
			</table>

			<?php submit_button(); ?>
		</form>

		<hr />
		<h2><?php echo esc_html__( 'Demo content', 'portfolio-cms' ); ?></h2>
		<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
			<?php wp_nonce_field( 'portfolio_cms_import_seed' ); ?>
			<input type="hidden" name="action" value="portfolio_cms_import_seed" />
			<?php submit_button( __( 'Import demo content', 'portfolio-cms' ), 'secondary', 'submit', false ); ?>
		</form>
	</div>
	<?php
}

/**
 * Render editorial field group (structured + JSON fallback).
 *
 * @param string               $option_name Option name.
 * @param array<string, mixed> $ed          Editorial array.
 * @param string               $json        Pretty JSON.
 */
function portfolio_cms_render_editorial_fields( string $option_name, array $ed, string $json ): void {
	$meta     = is_array( $ed['meta'] ?? null ) ? $ed['meta'] : array();
	$site     = is_array( $ed['site'] ?? null ) ? $ed['site'] : array();
	$about    = is_array( $ed['about'] ?? null ) ? $ed['about'] : array();
	$projects = is_array( $ed['projects'] ?? null ) ? $ed['projects'] : array();
	$contact  = is_array( $ed['contact'] ?? null ) ? $ed['contact'] : array();
	$footer   = is_array( $ed['footer'] ?? null ) ? $ed['footer'] : array();
	$blog     = is_array( $ed['blog'] ?? null ) ? $ed['blog'] : array();
	$gh       = is_array( $projects['githubStats'] ?? null ) ? $projects['githubStats'] : array();
	$keywords = isset( $meta['keywords'] ) && is_array( $meta['keywords'] ) ? implode( "\n", $meta['keywords'] ) : '';
	$focus    = isset( $about['focus'] ) && is_array( $about['focus'] ) ? implode( "\n", $about['focus'] ) : '';
	$p0       = is_array( $about['paragraphs'] ?? null ) ? (string) ( $about['paragraphs'][0] ?? '' ) : '';
	$p1       = is_array( $about['paragraphs'] ?? null ) ? (string) ( $about['paragraphs'][1] ?? '' ) : '';

	?>
	<table class="form-table" role="presentation">
		<tr><th><?php echo esc_html__( 'meta.role', 'portfolio-cms' ); ?></th><td><input class="regular-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[meta][role]" value="<?php echo esc_attr( (string) ( $meta['role'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'meta.description', 'portfolio-cms' ); ?></th><td><textarea class="large-text" rows="3" name="<?php echo esc_attr( $option_name ); ?>[meta][description]"><?php echo esc_textarea( (string) ( $meta['description'] ?? '' ) ); ?></textarea></td></tr>
		<tr><th><?php echo esc_html__( 'meta.keywords (lines)', 'portfolio-cms' ); ?></th><td><textarea class="large-text" rows="4" name="<?php echo esc_attr( $option_name ); ?>[meta][keywords]"><?php echo esc_textarea( $keywords ); ?></textarea></td></tr>
		<tr><th><?php echo esc_html__( 'site.tagline', 'portfolio-cms' ); ?></th><td><input class="large-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[site][tagline]" value="<?php echo esc_attr( (string) ( $site['tagline'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'site.roleLine', 'portfolio-cms' ); ?></th><td><input class="large-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[site][roleLine]" value="<?php echo esc_attr( (string) ( $site['roleLine'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'site.location', 'portfolio-cms' ); ?></th><td><input class="regular-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[site][location]" value="<?php echo esc_attr( (string) ( $site['location'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'about.title', 'portfolio-cms' ); ?></th><td><input class="regular-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[about][title]" value="<?php echo esc_attr( (string) ( $about['title'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'about.headline', 'portfolio-cms' ); ?></th><td><input class="large-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[about][headline]" value="<?php echo esc_attr( (string) ( $about['headline'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'about.paragraphs[0]', 'portfolio-cms' ); ?></th><td><textarea class="large-text" rows="4" name="<?php echo esc_attr( $option_name ); ?>[about][paragraphs][0]"><?php echo esc_textarea( $p0 ); ?></textarea></td></tr>
		<tr><th><?php echo esc_html__( 'about.paragraphs[1]', 'portfolio-cms' ); ?></th><td><textarea class="large-text" rows="4" name="<?php echo esc_attr( $option_name ); ?>[about][paragraphs][1]"><?php echo esc_textarea( $p1 ); ?></textarea></td></tr>
		<tr><th><?php echo esc_html__( 'about.focusTitle', 'portfolio-cms' ); ?></th><td><input class="regular-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[about][focusTitle]" value="<?php echo esc_attr( (string) ( $about['focusTitle'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'about.focus (lines)', 'portfolio-cms' ); ?></th><td><textarea class="large-text" rows="4" name="<?php echo esc_attr( $option_name ); ?>[about][focus]"><?php echo esc_textarea( $focus ); ?></textarea></td></tr>
		<tr><th><?php echo esc_html__( 'about.education', 'portfolio-cms' ); ?></th><td><input class="regular-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[about][education]" value="<?php echo esc_attr( (string) ( $about['education'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'about.involvement', 'portfolio-cms' ); ?></th><td><input class="regular-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[about][involvement]" value="<?php echo esc_attr( (string) ( $about['involvement'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'about.clubRole', 'portfolio-cms' ); ?></th><td><input class="regular-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[about][clubRole]" value="<?php echo esc_attr( (string) ( $about['clubRole'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'about.clubBlurb', 'portfolio-cms' ); ?></th><td><textarea class="large-text" rows="3" name="<?php echo esc_attr( $option_name ); ?>[about][clubBlurb]"><?php echo esc_textarea( (string) ( $about['clubBlurb'] ?? '' ) ); ?></textarea></td></tr>
		<tr><th><?php echo esc_html__( 'about.skills', 'portfolio-cms' ); ?></th><td><input class="regular-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[about][skills]" value="<?php echo esc_attr( (string) ( $about['skills'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'about.degree', 'portfolio-cms' ); ?></th><td><input class="regular-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[about][degree]" value="<?php echo esc_attr( (string) ( $about['degree'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'about.present', 'portfolio-cms' ); ?></th><td><input class="regular-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[about][present]" value="<?php echo esc_attr( (string) ( $about['present'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'projects.title', 'portfolio-cms' ); ?></th><td><input class="regular-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[projects][title]" value="<?php echo esc_attr( (string) ( $projects['title'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'projects.selectedWork', 'portfolio-cms' ); ?></th><td><input class="regular-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[projects][selectedWork]" value="<?php echo esc_attr( (string) ( $projects['selectedWork'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'projects.moreWork', 'portfolio-cms' ); ?></th><td><input class="regular-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[projects][moreWork]" value="<?php echo esc_attr( (string) ( $projects['moreWork'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'projects.githubStats.label', 'portfolio-cms' ); ?></th><td><input class="regular-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[projects][githubStats][label]" value="<?php echo esc_attr( (string) ( $gh['label'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'projects.githubStats.blurb', 'portfolio-cms' ); ?></th><td><textarea class="large-text" rows="2" name="<?php echo esc_attr( $option_name ); ?>[projects][githubStats][blurb]"><?php echo esc_textarea( (string) ( $gh['blurb'] ?? '' ) ); ?></textarea></td></tr>
		<tr><th><?php echo esc_html__( 'contact.title', 'portfolio-cms' ); ?></th><td><input class="regular-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[contact][title]" value="<?php echo esc_attr( (string) ( $contact['title'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'contact.blurb', 'portfolio-cms' ); ?></th><td><textarea class="large-text" rows="3" name="<?php echo esc_attr( $option_name ); ?>[contact][blurb]"><?php echo esc_textarea( (string) ( $contact['blurb'] ?? '' ) ); ?></textarea></td></tr>
		<tr><th><?php echo esc_html__( 'footer.availability', 'portfolio-cms' ); ?></th><td><input class="large-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[footer][availability]" value="<?php echo esc_attr( (string) ( $footer['availability'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'footer.builtWithCare', 'portfolio-cms' ); ?></th><td><input class="large-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[footer][builtWithCare]" value="<?php echo esc_attr( (string) ( $footer['builtWithCare'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'blog.title', 'portfolio-cms' ); ?></th><td><input class="regular-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[blog][title]" value="<?php echo esc_attr( (string) ( $blog['title'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'blog.blurb', 'portfolio-cms' ); ?></th><td><textarea class="large-text" rows="2" name="<?php echo esc_attr( $option_name ); ?>[blog][blurb]"><?php echo esc_textarea( (string) ( $blog['blurb'] ?? '' ) ); ?></textarea></td></tr>
		<tr><th><?php echo esc_html__( 'blog.homeTeaser', 'portfolio-cms' ); ?></th><td><input class="large-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[blog][homeTeaser]" value="<?php echo esc_attr( (string) ( $blog['homeTeaser'] ?? '' ) ); ?>" /></td></tr>
		<tr><th><?php echo esc_html__( 'blog.metaDescription', 'portfolio-cms' ); ?></th><td><textarea class="large-text" rows="2" name="<?php echo esc_attr( $option_name ); ?>[blog][metaDescription]"><?php echo esc_textarea( (string) ( $blog['metaDescription'] ?? '' ) ); ?></textarea></td></tr>
		<tr><th><?php echo esc_html__( 'blog.empty', 'portfolio-cms' ); ?></th><td><input class="large-text" type="text" name="<?php echo esc_attr( $option_name ); ?>[blog][empty]" value="<?php echo esc_attr( (string) ( $blog['empty'] ?? '' ) ); ?>" /></td></tr>
		<tr>
			<th><label for="<?php echo esc_attr( $option_name ); ?>_json"><?php echo esc_html__( 'Or paste full editorial JSON', 'portfolio-cms' ); ?></label></th>
			<td><textarea class="large-text code" rows="8" id="<?php echo esc_attr( $option_name ); ?>_json" name="<?php echo esc_attr( $option_name ); ?>[editorial_json]" placeholder="<?php echo esc_attr__( 'Leave empty to use fields above', 'portfolio-cms' ); ?>"></textarea>
			<p class="description"><?php echo esc_html__( 'If filled, this JSON replaces the structured fields on save.', 'portfolio-cms' ); ?></p>
			<details><summary><?php echo esc_html__( 'Current JSON preview', 'portfolio-cms' ); ?></summary><pre style="max-height:240px;overflow:auto;"><?php echo esc_html( $json ); ?></pre></details></td>
		</tr>
	</table>
	<?php
}
