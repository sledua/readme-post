//npm install --save-dev gulp gulp-cssnano gulp-clean browser-sync gulp-sass sass
const { src, dest, watch, parallel, series } = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const cssNano = require("gulp-cssnano");
const clean = require('gulp-clean');
const sync = require("browser-sync").create();
const NAMEPROD = 'space';
const DIST = 'dist';

function copy (cb) {
	src('app/js/*.js')
		.pipe(dest(`${DIST}/js/${NAMEPROD}`));
	src('app/fonts/**/*')
		.pipe(dest(`${DIST}/fonts/${NAMEPROD}`));
	src('app/img/**/*')
		.pipe(dest(`${DIST}/img/${NAMEPROD}`));
	src('app/libs/**/*')
		.pipe(dest(`${DIST}/libs/${NAMEPROD}`));
	src('app/*.html')
		.pipe(dest(`${DIST}/`));
	cb();
}
function cleanApp (cb) {
	src('dist/')
		.pipe(clean());
	cb();
	
}
function generateCSS(cb) {
	src('./app/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(dest(`${DIST}/css/${NAMEPROD}/`))
		.pipe(dest(`app/css/${NAMEPROD}/`))
		
	cb();
}
function watchApp(cb) {
	watch(['app/*.html',`app/scss/*.scss`,'app/js/*.js']);
	cb();
}
function browserSync(cb) {
	sync.init({
		server: {
			baseDir: "dist/"
		},
		notify: false,
		online: true,
		//tunnel: 'artdev', // Attempt to use the URL https://yousutename.loca.lt
	});
	watch('app/fonts/*/*.*', copy);
	watch('app/img/**/*', copy);
	watch('app/js/*', copy);
	watch('app/libs/**/*', copy);
	watch(`app/scss/*.scss`, generateCSS).on('change', sync.reload);
	watch('app/*.html', copy).on('change', sync.reload);
	cb();
}

exports.copy = copy;
exports.css = generateCSS;
exports.watch = watchApp;
exports.sync = browserSync;
exports.clean = cleanApp;
exports.dev = series(browserSync, watchApp);

