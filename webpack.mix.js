require('dotenv').config();

const startPath = '/';
const viewsFolder = '.';
const assetsFolder = 'resources';
const publicFolder = 'dist';
const staticFolder = 'static';
const path = require('path');

let mix = require('laravel-mix');
let mediaQueries = require(`./${assetsFolder}/scripts/mediaQueries`);

const browserSyncOptions = {
  proxy: process.env.PROXY_URL,
  startPath: startPath,
  watch: true,
  reload: true,
  notify: false,
  files: [
    `${publicFolder}/scripts/*.js`,
    `style.css`,
    `${publicFolder}/**/*.css`,
    `${viewsFolder}/*.php`,
    `${viewsFolder}/**/*.php`,
  ],
   // middleware: [proxyBaseURL]
};

const screenSizes = function(style){
  style.define('bigdesktop-layout', mediaQueries()['bigdesktop-layout']);
  style.define('mobilemenu-layout', mediaQueries()['mobilemenu-layout']);
  style.define('desktop-layout', mediaQueries()['desktop-layout']);
  style.define('tablet-layout', mediaQueries()['tablet-layout']);
  style.define('mobile-layout', mediaQueries()['mobile-layout']);
};

const autoprefixerOptions = {
  browserList: ['> 5%'],
  grid: 'autoplace'
};

mix.options({
  processCssUrls: false,
  postCss: [
    require('autoprefixer')(autoprefixerOptions),
  ],
});

// CSS, SCSS
mix.sass(
  `${assetsFolder}/scss/style.scss`, 
  `style.css`
)
.options({
  outputStyle: 'nested',
  processCssUrls: false
})
.webpackConfig({
  resolve: {
    alias: {
      '@': path.resolve('/resources/scss')
    }
  }
})

if ( !mix.inProduction() ){
  mix.sourceMaps()
  mix.webpackConfig({
    devtool: 'source-map'
  });
}


// Javascript
let $jsFiles = [
  `${assetsFolder}/scripts/header.js`,
  `${assetsFolder}/scripts/scripts.js`,
];
mix.js($jsFiles, `${publicFolder}/scripts/scripts.js`);

// BrowserSync
mix.browserSync(browserSyncOptions);

// Copy Fonts
// mix.copyDirectory(
//   `${assetsFolder}/fonts`,
//   `${staticFolder}/fonts`,
// ).options({
//   // Uses public/ by default
//   // From: https://github.com/JeffreyWay/laravel-mix/issues/1139#issuecomment-352105425
//   fileLoaderDirs: {
//     fonts: `${publicFolder}/fonts`
//   }
// });

// Copy Fonts - Font Awesome
// mix.copyDirectory(
//   `node_modules/font-awesome-stylus/fonts`,
//   `${staticFolder}/fonts`,
// ).options({
//   // Uses public/ by default
//   // From: https://github.com/JeffreyWay/laravel-mix/issues/1139#issuecomment-352105425
//   fileLoaderDirs: {
//     fonts: `${publicFolder}/fonts`
//   }
// });

mix.disableNotifications();