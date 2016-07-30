import source         from 'vinyl-source-stream';
import autoprefixer   from 'gulp-autoprefixer';
import sourcemaps     from 'gulp-sourcemaps';
import cleanCSS       from 'gulp-clean-css';
import browserSync    from 'browser-sync';
import buffer         from 'vinyl-buffer';
import uglify         from 'gulp-uglify';
import browserify     from 'browserify';
import sass           from 'gulp-sass';
import gulp           from 'gulp';
import del            from 'del';

const dirs = {
  src: 'src',
  dist: 'dist'
};

const paths = {
  style: {
    src: `${dirs.src}/scss`,
    dist: `${dirs.dist}/styles`
  },
  js: {
    src: `${dirs.src}/js`,
    dist: `${dirs.dist}/js`
  }
};

gulp.task('default', ['build', 'watch', 'server']);

gulp.task('build', ['build:js', 'build:css', 'build:html']);

gulp.task('server', () => {
  return browserSync.init([
    `${paths.js.dist}/*.js`,
    `${paths.style.dist}/*.css`,
    `${dirs.dist}/index.html`
  ], {
    server: {
      baseDir: `${dirs.dist}`
    }
  });
});

gulp.task('clean', () => {
  return del('dist');
});

gulp.task('watch', () => {
  gulp.watch(`${paths.js.src}/**/*.js`, ['build:js']);
  gulp.watch(`${paths.style.src}/*.scss`, ['build:css']);
  gulp.watch(`${dirs.src}/index.html`, ['build:html']);
});

gulp.task('build:js', () => {
  return browserify('src/js/app.js', { debug: true })
    .transform('babelify')
    .bundle() // bundler is simply browserify with all presets set
    .pipe(source('app.js')) // main source file
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(uglify())
    .pipe(sourcemaps.write('.')) // writes .map file
    .pipe(gulp.dest(`${paths.js.dist}`));
});



gulp.task('build:css', () => {
  return gulp.src('src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${paths.style.dist}`));
});

gulp.task('build:html', () => {
  return gulp.src([`${dirs.src}/*.html`])
    .pipe(gulp.dest(`${dirs.dist}`));
});
