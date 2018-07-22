const gulp = require('gulp');
const webp = require('gulp-webp');
//const imageminWebp = require('imagemin-webp');
const imageResize = require('gulp-image-resize');
var rename = require("gulp-rename");



gulp.task('imageswebp', () =>
  gulp.src('img/**/*')
  .pipe(webp())
  .pipe(rename({
    extname: ".webp"
  }))
  .pipe(gulp.dest('dist/img/'))
);

gulp.task('imagejpgscale', function () {
  gulp.src('img/**/*')
    .pipe(imageResize({
      width: 425,
      //height : 460,
      //crop : true,
      upscale: false
    }))
    .pipe(rename({
      suffix: "-small"
    }))
    .pipe(gulp.dest('dist/img/'));
});



gulp.task('copyimages', function () {
  gulp.src('img/**/*')
    .pipe(gulp.dest('dist/img/'));
});