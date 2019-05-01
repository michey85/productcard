const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss')
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const cssmqpacker = require('css-mqpacker');
var browserSync = require('browser-sync').create();

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: "./"
		},
		port: 8000
	});

});
gulp.task('sass', function () {
	var plugin = [
		autoprefixer(),
		cssmqpacker(),
		cssnano()
	];
		return gulp.src('src/scss/style.scss')
			.pipe(sass())
			.pipe(postcss(plugin))
			.pipe(gulp.dest('css'))
			.pipe(browserSync.reload({stream:true}))
	}
);
gulp.task('pug-compile', function () {
	return gulp.src(['src/pug/**/*.pug', '!src/pug/includes/**/*.pug'])
		.pipe(pug({pretty:true}))
		.pipe(gulp.dest('./'))
		.on('end', browserSync.reload);
});

gulp.task('watch',function () {
	gulp.watch('src/pug/**/*.pug', gulp.series('pug-compile'));
	gulp.watch('src/scss/**/*.scss', gulp.series('sass'))
});

gulp.task('default', gulp.series(
	gulp.parallel('pug-compile', 'sass'),
	gulp.parallel('watch', 'serve')
));
