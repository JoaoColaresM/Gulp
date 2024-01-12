const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const obfuscate = require('gulp-obfuscate')
const imagemin = require('gulp-imagemin')


function compilacaoSass() {
    return gulp.src('./fonte/estilo/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./final/estilo'))
}

function compressaoImagens() {
    return gulp.src('./fonte/imagens/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./final/imagens'))
}

function compressaoJavaScript() {
    return gulp.src('./fonte/js/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./final/js'))
}

exports.watch = function() {
    gulp.watch('./fonte/estilo/*.scss', {ignoreInitial: false}, gulp.series(compilacaoSass))
    gulp.watch('./fonte/imagens/*', {ignoreInitial: false}, gulp.series(compressaoImagens))
    gulp.watch('./fonte/js/*.js', {ignoreInitial: false}, gulp.series(compressaoJavaScript))
}