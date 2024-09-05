<?php

// Add Title tag support
add_theme_support( 'title-tag' );
add_theme_support( 'menus' );

// In replace of ACF Featured Image field
add_action( 'after_setup_theme', function(){
  remove_theme_support( 'post-thumbnails' );
}, 11 ); 