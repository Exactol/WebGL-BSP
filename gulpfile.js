var gulp        = require("gulp"),
    browserify  = require("browserify"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer"),
    tsc         = require("gulp-typescript"),
    sourcemaps  = require("gulp-sourcemaps"),
    uglify      = require("gulp-uglify"),
	runSequence = require("run-sequence").use(gulp),
	clean 		= require("gulp-clean"),
	gutil 		= require('gulp-util'),
	cache 		= require('gulp-cached');

var tsProject = tsc.createProject("tsconfig.json");
gulp.task("build", function() {
	return tsProject.src()
		.pipe(cache("buildCache"))
		.pipe(tsProject())
		.js.pipe(gulp.dest("./javascript"));
});

gulp.task("bundle", function() {
	var libraryName = "WebBSP";
	var mainTSFilePath = "javascript/main.js";
	var outputFolder = "javascript/";
	var outputFileName = libraryName + ".js";

	var bundler = browserify({
		debug: true,
		standalone: libraryName,
		detectGlobals: true,
	});

	return bundler.add(mainTSFilePath)
		.bundle()
		.pipe(source(outputFileName))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(outputFolder));
});

gulp.task("clean", function() {
	return (gulp.src("javascript/", {read: false}).pipe(clean()));
});

gulp.task("Build-and-Bundle", function() {
	runSequence("clean", "build", "bundle")
});