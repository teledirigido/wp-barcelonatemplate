<?php

add_action('init', function () {
  register_block_type(__DIR__ . '/site-header');
  register_block_type(__DIR__ . '/site-footer');
});