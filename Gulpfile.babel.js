import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';
import run from 'run-sequence';
import chokidar from 'chokidar';
import mkdirp from 'mkdirp-promise';
import beepbeep from 'beepbeep';
import {webpackConfig} from './webpack.config.js';

const plugins = loadPlugins();

function chokidarWatch(glob, fn) {
  const watcher = chokidar.watch(glob);
  watcher.on('ready', () => {
    watcher.on('all', (...args) => fn(...args));
  });
}

function chokidarWatchRun(glob, ...targets) {
  chokidarWatch(glob, (event, filepath) => run(...targets));
}

gulp.task('clean', next => {
  rimraf('./Distribution', next);
});

gulp.task('prepare:directories', () => Promise.all([
  mkdirp('Distribution'),
  mkdirp('Distribution/Library'),
  mkdirp('Distribution/Pages'),
]));

gulp.task('prepare', ['prepare:directories']);

gulp.task('copy:pages', () => {
  return gulp.src('Pages/**/*')
    .pipe(gulp.dest('./Distribution/Pages/'));
});

gulp.task('copy:manifest', () => {
  return gulp.src('manifest.json')
    .pipe(gulp.dest('./Distribution/'));
});

gulp.task('copy', ['copy:pages', 'copy:manifest']);

gulp.task('webpack', next => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new plugins.util.PluginError('webpack', err);
    }

    plugins.util.log('[webpack]', stats.toString());
    next();
  });
});

gulp.task('sass', () => {
  return gulp.src(['Styles/**/*.{scss,sass}', '!Styles/**/_*.{scss,sass}'])
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.plumber(error => {
      beepbeep();
      console.error(chalk.red('Error compiling Sass file.')); // eslint-disable-line no-console
      console.error(chalk.red(error.message)); // eslint-disable-line no-console
      this.emit('end');
    }))
    .pipe(plugins.sass({
      precision: 8,
      errLogToConsole: false,
    }))
    .pipe(plugins.plumber.stop())
    .pipe(plugins.autoprefixer({
      browsers: 'last 5 Chrome versions',
    }))
    .pipe(plugins.sourcemaps.write('./', {sourceRoot: null}))
    .pipe(gulp.dest('Distribution/Styles/'));
});

gulp.task('build', next => run(
  'clean',
  'prepare',
  ['copy', 'sass', 'webpack'],
  next
));

gulp.task('watch', ['default'], () => {
  chokidarWatchRun('Pages/**/*', 'copy:pages');
  chokidarWatchRun('manifest.json', 'copy:manifest');
  chokidarWatchRun('Application/**/*', 'webpack');
  chokidarWatchRun('Styles/**/*', 'sass');
});

gulp.task('default', ['build']);
