var gulp = require("gulp"),
    htmlhint = require("gulp-htmlhint"),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCSS = require("gulp-clean-css"),
    csslint = require('gulp-csslint'),
    jshint = require("gulp-jshint"),
    jsStylish = require("jshint-stylish"),
    uglify = require("gulp-uglify"),
    notify = require("gulp-notify"),
    concat = require("gulp-concat");


const PATHS = {
    EXTERNALS: {
        SRC: './bower_components/',
        DEST: './wwwroot/lib'
    },
    FONTS: {
        SRC: './app/fonts/',
        DEST: './wwwroot/fonts'
    },
    CSS: {
        SRC: './app/css/**/*.css',
        DEST: './wwwroot/css'
    },
    HTML: {
        SRC: './wwwroot/**/*.html'
    },
    JS: {
        SRC: "./app/js/**/*.js",
        DEST: "./wwwroot/js"
    }
};

gulp.task("default", function () {
    var htmlWatcher = gulp.watch(PATHS.HTML.SRC, ['html-validate']);
    var cssWatcher = gulp.watch(PATHS.CSS.SRC, ['css']);
    var jsWachter = gulp.watch(PATHS.JS.SRC, ['js']);
    cssWatcher.on('change', function (event) {
        console.log("File: " + event.path + " was " + event.type);
    });
});

const AUTOPREFIXOPTIONS = {
    browsers: ['last 2 versions']
};

gulp.task("css", function () {

    gulp.src(PATHS.CSS.SRC)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(AUTOPREFIXOPTIONS))
        .pipe(csslint())
        //.pipe(csslint.formatter())
        .pipe(concat("main.min.css"))
        .pipe(cleanCSS({debug: true, compatibility: '*'}, function (details) {
            //console.log(details);
            console.log(details.name + ": " + details.stats.originalSize);
            console.log(details.name + ": " + details.stats.minifiedSize);
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(PATHS.CSS.DEST));
});

gulp.task("js", function () {
    gulp.src(PATHS.JS.SRC)
        .pipe(jshint())
        .pipe(jshint.reporter(jsStylish))
        .pipe(sourcemaps.init())
        .pipe(concat("app.min.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(PATHS.JS.DEST))
        .pipe(notify({message: 'js built'}));
});

gulp.task("html-validate", function () {
    gulp.src(PATHS.HTML.SRC)
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.reporter("htmlhint-stylish"));
    //.pipe(htmlhint.failReporter());
});

gulp.task("copy-externals", function () {
    // dist folder van bower_components nr lib in wwwroot kopieren
    gulp.src(PATHS.EXTERNALS.SRC + "bootstrap/dist/**")
        .pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/bootstrap"))
});

gulp.task("copy-fonts", function () {
    gulp.src(PATHS.FONTS.SRC + "*")
        .pipe(gulp.dest(PATHS.FONTS.DEST));
});
