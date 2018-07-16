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
	watch		= require("gulp-watch")
	browserSync	= require("browser-sync");


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
		.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
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
	browserSync.init({
		server: {
			baseDir: "./",
			injectChanges: true,
		}
	});
	watch(path.src, (file) => {
		// for some reason gulp dest will not send output file to it's subdirectory, so it needs to be calculated
		const subPath = getSubDirPath(file.path);
		console.log(subPath);
		gulp.src(file.path)
				.pipe(plumber())
				.pipe(debug({title: "Compiling:"}))
				.pipe(tsWatchProject())
				.on("error", function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
				.pipe(gulp.dest(path.jsDest + subPath))
				.pipe(print((filepath) => `Compiled: ${filepath}`));
		watchBundleUglify();
		browserSync.reload();
		});
});

function getSubDirPath(fullFilePath) {
	let fileSplit = fullFilePath.split("\\");

	// remove file name
	fileSplit.pop();

	// reconstruct string and split on \src\
	fileSplit = fileSplit.join("\\").split("\\src\\");

	if (fileSplit.length == 1) {
		// when file is not in subdirectory return nothing
		return "";
	}
	return fileSplit.pop();
}

gulp.task("default", ["build-and-bundle"]);