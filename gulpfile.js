const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
// const postcss = require('gulp-postcss');
// const cssnano = require('cssnano');
const nunjucksRender = require('gulp-nunjucks-render');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

function css() {
    const isProd = process.env.NODE_ENV === 'production';
    return src('src/styles/style.scss', { sourcemaps: !isProd })
        .pipe(sass({
            includePaths: ['node_modules']
        }))
        // .pipe(postcss([]))
        .pipe(dest('src/styles', { sourcemaps: isProd ? '.' : '' }));
}

function nunjucks() {
    // Gets .html and .nunjucks files in pages
    return src('src/pages/**/*.+(html|njk)')
        // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['src/templates']
        }))
        // output files in app folder
        .pipe(dest('src'))
};

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
    watch('src/**/*.njk', series(nunjucks));
    watch('src/**/*.html', series(browsersyncReload));
    watch(['src/**/*.scss', 'src/**/*.js'], series(css, browsersyncReload));
}

exports.dev = series(
    nunjucks,
    css,
    // jsTask,
    browsersyncServe,
    watchTask
);