const { src, dest, watch, parallel, series } = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const cssNano = require("gulp-cssnano");
const clean = require('gulp-clean');
const sync = require("browser-sync").create();
const NAMEPROD = 'huddle_landing_page';
const DIST = 'dist';

function copy (cb) {
	src('app/js/*/*.js')
		.pipe(dest(`${DIST}/js/${NAMEPROD}/`));
	src('app/fonts/*/*.*')
		.pipe(dest(`${DIST}/fonts/`));
	src('app/img/**/*')
		.pipe(dest(`${DIST}/img/${NAMEPROD}/`));
	src('app/libs/**/*')
		.pipe(dest(`${DIST}/libs/`));
	src('app/*.html')
		.pipe(dest(`${DIST}/`));
	cb();
}
function cleanApp (cb) {
	src('dist/')
		.pipe(clean());
	cb();
}
function generateCSS() {
	src('./app/scss/*/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cssNano())
		.pipe(dest(`${DIST}/css/${NAMEPROD}/`))
		.pipe(sync.stream());
}
function watchApp() {
	watch('app/*.html', copy);
	watch('app/fonts/*/*.*', copy);
	watch('app/img/**/*', copy);
	watch('app/libs/**/*', copy);
	watch(`app/scss/${NAMEPROD}/*.scss`, generateCSS);
}
function browserSync() {
	sync.init({
		server: {
			baseDir: "app/"
		}
	});
	watch('app/fonts/*/*.*', copy);
	watch('app/img/**/*', copy);
	watch('app/libs/**/*', copy);
	watch(`app/scss/${NAMEPROD}/*.scss`, generateCSS);
	watch('app/*.html', copy).on('change', sync.reload);
}

exports.copy = copy;
exports.css = generateCSS;
exports.watch = watchApp;
exports.sync = browserSync;
exports.dev = series(cleanApp, browserSync);
