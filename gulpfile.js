// Dependencies
const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const imagewebp = require('gulp-webp');

//Compile, prefix, and min scss
function compilescss() {
  return src('assets/scss/*.scss')
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(minify())
    .pipe(dest('assets/css'))
};

//webp
function webpImage() {
  return src('assets/images/*.{jpg,png}')
    .pipe(imagewebp())
    .pipe(dest('assets/images'))
};

//watchtask
function watchTask(){
  watch('assets/scss/*.scss', compilescss);
  watch('assets/images/*.{jpg,png}', webpImage);
};


// Default Gulp task 
exports.default = series(
  compilescss,
  webpImage,
  watchTask
);