/// <binding Clean='clean' ProjectOpened='watch' />

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    typescript = require('gulp-typescript'),
    shell = require("gulp-shell");
    //project = require("./project.json");

gulp.task("min:js", function () {

    var tsProject = typescript.createProject('./wwwroot/typescript/tsconfig.json');
    
    var tsResult = gulp.src(["./wwwroot/typescript/**/*.ts"])
        .pipe(tsProject());
    
        //tsProject.src(["./wwwroot/typescript/**/*.ts"]) //, "!./wwwroot/typescript/**/*.spec.ts"])
        //.pipe(sourcemaps.init())
        //.pipe(typescript(tsProject));
    return tsResult
        //.pipe(uglify())
        //.pipe(concat("./wwwroot/js/site.min.js"))
        //.pipe(sourcemaps.write("."))
        .js.pipe(gulp.dest("./wwwroot/js"));
});

gulp.task("min:css", function () {
    gulp.src(["./wwwroot/scss/**/*.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        //.pipe(concat("./wwwroot/css/site.min.css"))
        //.pipe(cssmin())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./wwwroot/css"));
});

gulp.task("min", ["min:js", "min:css"]);

gulp.task("watch", function () {
    gulp.watch("./wwwroot/typescript/**/*.ts", ['min:js']);
    gulp.watch("./wwwroot/scss/**/*.scss", ['min:css']);
});

gulp.task('dnxWatch', shell.task(['dnx-watch web']));

gulp.task("lib", function () {
    gulp.src("./node_modules/@angular/**/bundles/**/*")
        .pipe(gulp.dest("./wwwroot/js/lib/@angular"));
    
    gulp.src("./node_modules/reflect-metadata/**/*")
        .pipe(gulp.dest("./wwwroot/js/lib/reflect-metadata"));

    gulp.src("./node_modules/zone.js/dist/**/*")
        .pipe(gulp.dest("./wwwroot/js/lib/zone"));

    gulp.src("./node_modules/core-js/client/**/*")
        .pipe(gulp.dest("./wwwroot/js/lib/core-js"));

    gulp.src("./node_modules/systemjs/dist/**/*")
        .pipe(gulp.dest("./wwwroot/js/lib/system"));
    //gulp.src("./node_modules/jasmine-core/lib/jasmine-core/**/*")
    //    .pipe(gulp.dest("./wwwroot/js/lib/jasmine"));
    gulp.src("./node_modules/rxjs/**/*")
        .pipe(gulp.dest("./wwwroot/js/lib/rxjs"));
    gulp.src("./node_modules/bootstrap/scss/**/*")
        .pipe(gulp.dest("./wwwroot/scss/lib/bootstrap"));
    gulp.src("./node_modules/bootstrap/dist/js/**/*")
        .pipe(gulp.dest("./wwwroot/js/lib/bootstrap"));
    gulp.src("./node_modules/jquery/dist/**/*")
        .pipe(gulp.dest("./wwwroot/js/lib/jquery"));
    gulp.src("./node_modules/tether/dist/js/**/*")
        .pipe(gulp.dest("./wwwroot/js/lib/tether"));
    gulp.src("./node_modules/tether/dist/css/**/*")
        .pipe(gulp.dest("./wwwroot/css/lib/tether"));
    gulp.src("./Assets/flaticon/**/*")
        .pipe(gulp.dest("./wwwroot/css/lib/flaticon"));
});