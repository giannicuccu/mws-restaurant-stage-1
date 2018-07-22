
const gulp = require('gulp');
const webp = require('gulp-webp');
//const imageminWebp = require('imagemin-webp');
const imageResize = require('gulp-image-resize');
var rename = require("gulp-rename");


//const imagemin = require('imagemin');


// const pipes = require('gulp-pipes');


// const imagemin = require('imagemin');
// const imageminWebp = require('imagemin-webp');

// imagemin(['img/*.{jpg,png}'], 'dist/img/', {
// 	use: [
// 		imageminWebp({quality: 50})
// 	]
// }).then(() => {
// 	console.log('Images optimized');
// });


 
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
        width : 425,
        //height : 460,
        //crop : true,
        upscale : false
      }))
      .pipe(rename({
        suffix: "-small"        
      }))
      .pipe(gulp.dest('dist/img/'));
  });

  
// gulp.task('imagewebpscale', function () {
//   gulp.src('dist/img/*.webp')
//     .pipe(imageResize({
//       width : 425,
//       //height : 460,
//       //crop : true,
//       upscale : false
//     }))
//     .pipe(rename({
//       suffix: "-small"        
//     }))
//     .pipe(gulp.dest('dist/img/'));
// });


  gulp.task('copyimages', function () {
    gulp.src('img/**/*')
            .pipe(gulp.dest('dist/img/'));
  });


