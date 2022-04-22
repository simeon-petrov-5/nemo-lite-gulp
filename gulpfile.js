const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
// const postcss = require('gulp-postcss');
// const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

function css() {
    const isProd = process.env.NODE_ENV === 'production';
    return src('src/styles/style.scss', { sourcemaps: isProd })
        .pipe(sass({
            includePaths: ['node_modules']
          }))
        // .pipe(postcss([]))
        .pipe(dest('src/styles', { sourcemaps: isProd ? '.' : '' }));
}

// JavaScript Task
// function jsTask(){
//     return src('src/js/script.js', { sourcemaps: true })
//       .pipe(terser())
//       .pipe(dest('dist', { sourcemaps: '.' }));
//   }

function browsersyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: './src'
        }
    });
    cb();
}

function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

function watchTask() {
    watch('src/*.html', browsersyncReload);
    watch(['src/**/*.scss', 'src/**/*.js'], series(css, browsersyncReload));
}

exports.dev = series(
    css,
    // jsTask,
    browsersyncServe,
    watchTask
);