var gulp = require("gulp"),
    htmlhint = require("gulp-htmlhint"),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCSS = require("gulp-clean-css"),
    csslint = require('gulp-csslint'),
    jshint = require("gulp-jshint"),
    tslint = require("gulp-tslint"),
    jsStylish = require("jshint-stylish"),
    uglify = require("gulp-uglify"),
    notify = require("gulp-notify"),
    concat = require("gulp-concat"),
    sass = require("gulp-sass"),
    merge = require("merge-stream");


const PATHS = {
    EXTERNALS: {
        SRC: './bower_components/',
        DEST: './wwwroot/lib'
    },
    CSS: {
        SRC: './app/css/**/*.css',
        SASS: './app/sass/**/*.scss',
        DEST: './wwwroot/css'
    },
    HTML: {
        SRC: './wwwroot/**/*.html'
    },
    JS: {
        SRC: "./app/js/**/*.js",
        TS: "./app/ts/**/*.ts",
        DEST: "./wwwroot/js"
    },
    NODE: {
        SRC: "./backend/**/*.js"
    }
};

gulp.task("default", function () {
    var htmlWatcher = gulp.watch(PATHS.HTML.SRC, ['html-validate']),
        cssWatcher = gulp.watch(PATHS.CSS.SRC, ['css']),
        cssWatcher = gulp.watch(PATHS.CSS.SASS, ['css']),
        jsWachter = gulp.watch(PATHS.JS.SRC, ['js']),
        tsWachter = gulp.watch(PATHS.JS.TS, ['js']),
        nodeWachter = gulp.watch(PATHS.NODE.SRC, ['node']);
        
    cssWatcher.on('change', function (event) {
       console.log("File '" + event.path + "' was " + event.type);
    });
});

const AUTOPREFIXOPTIONS = {
    browsers: ['last 2 versions']
};

gulp.task("css", function () {
    var css = gulp.src(PATHS.CSS.SRC)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(AUTOPREFIXOPTIONS))
        .pipe(csslint())
        .pipe(csslint.formatter())
        .pipe(concat("main.min.css"))
        .pipe(cleanCSS({debug: true, compatibility: '*'}, function (details) {
            console.log(details.name + ": " + (details.stats.minifiedSize - details.stats.originalSize));
        }))
        .pipe(sourcemaps.write())
    var scss = gulp.src(PATHS.CSS.SASS)
      .pipe(sourcemaps.init())
      .pipe(sass.on('error',sass.logError))
      .pipe(sourcemaps.write());
    return merge(css,sass)
        .pipe(concat("main.min.css"))
        .pipe(gulp.dest(PATHS.CSS.DEST));
});

gulp.task("js", function () {
    var js = gulp.src(PATHS.JS.SRC)
        .pipe(jshint())
        .pipe(jshint.reporter(jsStylish))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write());
    var ts = gulp.src(PATHS.JS.TS)
        .pipe(tslint())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
    return merge(js, ts)
        .pipe(concat("app.min.js"))
        .pipe(gulp.dest(PATHS.JS.DEST))
        .pipe(notify({message: 'js built'}));
});

gulp.task("node", function () {
    gulp.src(PATHS.NODE.SRC)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', { verbose: true }));
});

gulp.task("html-validate", function () {
    gulp.src(PATHS.HTML.SRC)
        .pipe(htmlhint('.htmlhintrc'))
        //.pipe(htmlhint.reporter("htmlhint-stylish"))
        .pipe(htmlhint.failReporter());
});

gulp.task("copy-externals", function () {
    // dist folder van bower_components nr lib in wwwroot kopieren
    gulp.src(PATHS.EXTERNALS.SRC + "bootstrap/dist/**")
        .pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/bootstrap"))
});