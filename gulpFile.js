var gulp=require('gulp');

var sass=require('gulp-sass');
var browserSync=require('browser-sync');
var concat = require('gulp-concat');
var uglify =require('gulp-uglifyjs');
var cssnano=require('gulp-cssnano');
var rename = require('gulp-rename');
var del=require('del');
var imagemin = require('gulp-imagemin');
var pngquant = require('pngquant');
var cache = require('gulp-cache');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', function(){
    return gulp.src('app/sass/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '>1%', 'ie 8', 'ie 7'], {cascado:true}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('scrips', function(){
    return gulp.src(['app/js/jquery-1.11.0.min.js', 
    'app/js/jquery-migrate-1.2.1.min.js',
    'app/libs/slick/slick.min.js'])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
});

gulp.task('css-libs', ['scss'],function(){
    return gulp.src(['app/css/libs.css'])
    .pipe(cssnano())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('app/css'))
});

gulp.task('browser-sync', function(){
    browserSync({
        server:{
            baseDir:'app'
        },
        notify:false

    })
});

gulp.task('clean', function(){
    return del.sync('dist');
});
gulp.task('clear', function(){
    return cache.clearAll();

});

gulp.task('img', function(){
    return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
        interlaced:true,
        progressive:true,
        svgoPlugins:[{removeViewBox: false}],
        une:[pngquant()]
    })))
    .pipe(gulp.dest('dist/img'));

});

gulp.task('copy', function(){
    return gulp.src(['app/libs/slick/slick-theme.css',
'app/libs/slick/slick.css'])
    .pipe(gulp.dest('dist/css'));

});
gulp.task('slick-font', function(){
    return  gulp.src('app/libs/slick/fonts/**')
    .pipe(gulp.dest('dist/css/fonts'));
});

gulp.task('watch',['browser-sync','css-libs', 'scrips'], function(){
    gulp.watch('app/sass/**/*.scss',['scss']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload);
});

gulp.task('build', ['copy','slick-font','clean','img','scss','scrips'],function(){
    var buildCss = gulp.src([
        'app/css/style.css',
        'app/css/libs.min.css'
    ])
    .pipe(gulp.dest('dist/css'));
    var buildFonts =gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));

    var buildHtml= gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

});