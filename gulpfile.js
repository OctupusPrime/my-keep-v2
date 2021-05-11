var gulp        = require('gulp');
var less        = require('gulp-less');
var browserSync = require('browser-sync');
var browserify  = require('browserify');
var vueify      = require('vueify');
var sourse      = require('vinyl-source-stream');

gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('html', function () {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('img', function() {
    gulp.src('./src/img/**/*.*')
        .pipe(gulp.dest('./dist/img'))
});

gulp.task('css', function () {
    gulp.src('./src/less/index.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function () {
    browserify('./src/js/index.js')
        .transform(vueify)
        .bundle()
        .pipe(sourse('scripts.all.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', function () {
    gulp.watch('./src/*.html', gulp.series('html'));
    gulp.watch('./src/less/**/*.less', gulp.series('css'));
    gulp.watch('./src/js/**/*.js', gulp.series('js'));
    gulp.watch('./src/img/**/*.*' , gulp.series('img'));
    gulp.watch('./src/vue/**/*.vue', gulp.series('js'));
});

gulp.task('build', gulp.series(gulp.parallel('html', 'css', 'js', 'img')));

gulp.task('default', gulp.series(gulp.parallel('build', 'watch', 'server')));