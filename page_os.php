<?php
/*
Template Name: OS Home Page
*/
?>

<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/html-header', 'parts/shared/header' ) ); ?>

<main id="main" class="main" role="main">
    <header class="page-header">
        <h2><?php the_title(); ?></h2>
    </header>
    
    <section class="os-description <?php echo strtolower(get_the_title()); ?>">
        <?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
            <?php the_content(); ?>
        <?php endwhile; ?>
    </section>
</main>

<?php Starkers_Utilities::get_template_parts( array( 'parts/shared/footer','parts/shared/html-footer' ) ); ?>