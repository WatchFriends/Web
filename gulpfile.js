const gulp = require("gulp"),
    htmlhint = require("gulp-htmlhint"),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCSS = require("gulp-clean-css"),
    csslint = require("gulp-csslint"),
    jshint = require("gulp-jshint"),
    tslint = require("gulp-tslint"),
    typescript = require("gulp-typescript"),
    jsStylish = require("jshint-stylish"),
    uglify = require("gulp-uglify"),
    notify = require("gulp-notify"),
    concat = require("gulp-concat"),
    sass = require("gulp-sass"),
    merge = require("merge-stream"),
    strip = require('gulp-strip-comments'),
    stripCssComments = require('gulp-strip-css-comments');

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
        SRC: "./wwwroot/**/*.html"
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
    const htmlWatcher = gulp.watch(PATHS.HTML.SRC, ['html']),
        cssWatcher = gulp.watch(PATHS.CSS.SRC, ['css']),
        sassWatcher = gulp.watch(PATHS.CSS.SASS, ['css']),
        jsWachter = gulp.watch(PATHS.JS.SRC, ['js']),
        tsWachter = gulp.watch(PATHS.JS.TS, ['js']),
        nodeWachter = gulp.watch(PATHS.NODE.SRC, ['node']);
        
    cssWatcher.on( 'change', event => console.log(`File ${event.path} was ${event.type}`));
});

const AUTOPREFIXOPTIONS = {
    browsers: ['last 2 versions']   
};

gulp.task("css", () => {
    const css = gulp.src(PATHS.CSS.SRC)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(AUTOPREFIXOPTIONS))
        .pipe(csslint())
        .pipe(csslint.formatter())
        .pipe(sourcemaps.write()),
    scss = gulp.src(PATHS.CSS.SASS)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write());

    return merge(css, scss)
        .pipe(cleanCSS({debug: true, compatibility: '*'},  
            details => console.log(details.name + ": " + (details.stats.originalSize-details.stats.minifiedSize))
        ))
        .pipe(concat("main.min.css"))
        .pipe(stripCssComments())
        .pipe(gulp.dest(PATHS.CSS.DEST));
});

gulp.task("js", function () {

    //TODO: na development, alles uit commentaar halen in deze functie!

    var js = gulp.src(PATHS.JS.SRC)
        .pipe(jshint())
        .pipe(jshint.reporter(jsStylish))
        .pipe(sourcemaps.init())
        //.pipe(uglify()) 
        .pipe(sourcemaps.write());
    var ts = gulp.src(PATHS.JS.TS)
        //.pipe(tslint())
        .pipe(typescript({
            module:"amd",
            experimentalDecorators:true,
        }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write());
    return merge(js, ts)
        .pipe(concat("app.min.js"))
        //.pipe(strip())
        .pipe(gulp.dest(PATHS.JS.DEST));
});

gulp.task("node", () => 
    gulp.src(PATHS.NODE.SRC)
        .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish", { verbose: true }))
);

gulp.task("html", () => 
    gulp.src(PATHS.HTML.SRC)
        .pipe(htmlhint(".htmlhintrc"))
        //.pipe(htmlhint.reporter("htmlhint-stylish"))
        .pipe(htmlhint.failReporter())
);

gulp.task("copy-externals", () => 
    // dist folder van bower_components naar lib in wwwroot kopieren
    gulp.src(PATHS.EXTERNALS.SRC + "bootstrap/dist/**")
        .pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/bootstrap"))
);
