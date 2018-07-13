const gulp      = require("gulp"),
    browserify  = require("browserify"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer"),
    tsc         = require("gulp-typescript"),
    sourcemaps  = require("gulp-sourcemaps"),
    uglify      = require("gulp-uglify"),
	runSequence = require("run-sequence").use(gulp),
	clean 		= require("gulp-clean"),
	gutil 		= require("gulp-util"),
	plumber		= require("gulp-plumber")
	debug		= require("gulp-debug")
	print		= require("gulp-print").default
	watchify	= require("watchify")
	watch		= require("gulp-watch");


const path = {
	src: "src/**/*.ts",
	typeSrc: "@types/**/*.ts",
	jsDest: ".tmp/",
	finalDest: "dist/"

}
const tsProject = tsc.createProject("tsconfig.json");
const tsWatchProject = tsc.createProject("tsconfig.watch.json");

const libraryName = "WebBSP";

var bundler = watchify(browserify({
	debug: true,
	standalone: libraryName,
	detectGlobals: true,
	cache: {},
	packageCache: {},
	fullPaths: true
}));

bundler.on("update", watchBundleUglify);

gulp.task("build", function() {
	return gulp.src([path.src, path.typeSrc])
		.pipe(tsProject())
		.pipe(gulp.dest(path.jsDest));
});

gulp.task("bundle-uglify", () => {
	var mainJsFile = path.jsDest + "/main.js";
	var outputFileName = libraryName + ".js";

	var bundler = browserify({
		debug: true,
		standalone: libraryName,
		detectGlobals: true,
	});

	return bundler.add(mainJsFile)
		.bundle()
		.pipe(source(outputFileName))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(path.finalDest));
});

function watchBundleUglify() {
	var mainJsFile = path.jsDest + "/main.js";
	var outputFileName = libraryName + ".js";

	return bundler.add(mainJsFile)
		.bundle()
		.pipe(source(outputFileName))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(path.finalDest));
}

gulp.task("clean", function() {
	return (
		gulp.src([path.jsDest, path.finalDest], {read: false})
		.pipe(clean()));
});

gulp.task("build-and-bundle", function() {
	runSequence("clean", "build", "bundle-uglify")
});

gulp.task("watch", () => {
	watch(path.src, (file) => {
		// for some reason gulp dest will not send output file to it's subdirectory, so it needs to be calculated
		const subPath = getSubDirPath(file.path);
		gulp.src(file.path)
				.pipe(plumber())
				.pipe(debug({title: "Compiling"}))
				.pipe(tsWatchProject())
				.pipe(gulp.dest(path.jsDest + subPath))
				.pipe(print((filepath) => `Built: ${filepath}`));
		watchBundleUglify();
		});
});

function getSubDirPath(filePath) {
	const fileSplit = filePath.split("\\");
	fileSplit.pop();
	return fileSplit.join("\\").split("\\src\\").pop();
}

gulp.task("default", ["build-and-bundle"]);