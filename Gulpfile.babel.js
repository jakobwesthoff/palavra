/* eslint-disable import/no-extraneous-dependencies, arrow-body-style */

import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';
import run from 'run-sequence';
import chokidar from 'chokidar';
import mkdirp from 'mkdirp-promise';
import beepbeep from 'beepbeep';
import chalk from 'chalk';
import {webpackConfig} from './webpack.config.js';

const plugins = loadPlugins();

function isDevelopmentEnvironment() {
  return process.env.NODE_ENV !== 'production';
}

function chokidarWatch(glob, fn) {
  const watcher = chokidar.watch(glob);
  watcher.on('ready', () => {
    watcher.on('all', (...args) => fn(...args));
  });
}

function chokidarWatchRun(glob, ...targets) {
  if (targets.length === 1 && typeof targets[0] === 'function') {
    chokidarWatch(glob, targets[0]);
  } else {
    chokidarWatch(glob, () => run(...targets));
  }
}

gulp.task('clean', next => {
  rimraf('./Distribution', next);
});

gulp.task('prepare:directories', () => Promise.all([
  mkdirp('Distribution'),
  mkdirp('Distribution/Library'),
  mkdirp('Distribution/Pages'),
  mkdirp('Distribution/Fonts'),
  mkdirp('Distribution/Assets'),
]));

gulp.task('prepare', ['prepare:directories']);

gulp.task('copy:pages', () => {
  return gulp.src('Pages/**/*')
    .pipe(gulp.dest('./Distribution/Pages/'));
});

gulp.task('copy:manifest', () => {
  let stream = gulp.src('manifest.json');
  if (!isDevelopmentEnvironment()) {
    stream = stream.pipe(
      plugins.replace(/"name": "([^"]+) DEV"/, '"name": "$1"')
    );
  }
  return stream.pipe(gulp.dest('./Distribution/'));
});

gulp.task('copy:fonts:open-sans', () => {
  return gulp.src('node_modules/open-sans-fontface/fonts/**/*')
    .pipe(gulp.dest('./Distribution/Fonts/OpenSans/'));
});

gulp.task('copy:fonts:font-awesome', () => {
  return gulp.src('node_modules/font-awesome/fonts/**/*')
    .pipe(gulp.dest('./Distribution/Fonts/FontAwesome'));
});

gulp.task('copy:fonts', ['copy:fonts:open-sans', 'copy:fonts:font-awesome']);

gulp.task('copy:assets:icons', () => {
  return gulp.src([
    'Assets/icon-rounded-*.png',
  ])
    .pipe(gulp.dest('./Distribution/Assets/'));
});

gulp.task('copy:assets', ['copy:assets:icons']);

gulp.task('copy', ['copy:pages', 'copy:manifest', 'copy:fonts', 'copy:assets']);

gulp.task('webpack', next => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new plugins.util.PluginError('webpack', err);
    }

    plugins.util.log('[webpack]', stats.toString({colors: true}));
    next();
  });
});

let webpackWatcherState = null;
gulp.task('webpack:watch', next => {
  const compiler = webpack(webpackConfig);
  webpackWatcherState = {};
  webpackWatcherState.next = next;
  plugins.util.log(chalk.blue('Webpack build started.'));
  webpackWatcherState.watcher = compiler.watch({
    aggregateTimeout: 300,
  }, (err, stats) => {
    if (err) {
      throw new plugins.util.PluginError('webpack', err);
    }

    plugins.util.log(stats.toString({
      colors: true,
      version: false,
      timings: true,
      chunks: false,
    }));
    plugins.util.log(chalk.blue('Webpack build finished'));
  });
});

gulp.task('sass', () => {
  let stream = gulp.src(['Styles/**/*.{scss,sass}', '!Styles/**/_*.{scss,sass}']);
  if (isDevelopmentEnvironment()) {
    stream = stream.pipe(plugins.sourcemaps.init());
  }
  stream = stream.pipe(plugins.plumber(function (error) { // We need a this bindable function here
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
    }));

  if (isDevelopmentEnvironment()) {
    stream = stream.pipe(plugins.sourcemaps.write('./', {sourceRoot: null}))
  }
  return stream.pipe(gulp.dest('Distribution/Styles/'));
});

gulp.task('optimize:css', () => {
  return gulp.src('Distribution/**/*.css')
    .pipe(plugins.cleanCss())
    .pipe(gulp.dest('Distribution'));
});

gulp.task('optimize:html', () => {
  return gulp.src('Distribution/**/*.html')
    .pipe(plugins.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('Distribution'));
});

gulp.task('optimize:javascript', () => {
  return gulp.src('Distribution/**/*.js')
    .pipe(plugins.uglify({
      preserveComments: 'license',
    }))
    .pipe(gulp.dest('Distribution'));
});


gulp.task('optimize', ['optimize:css', 'optimize:html', 'optimize:javascript']);

gulp.task('build', next => {
  const buildSteps = [
    'clean',
    'prepare',
    ['copy', 'sass', 'webpack'],
  ];

  if (!isDevelopmentEnvironment()) {
    buildSteps.push('optimize');
  }

  run(
    ...buildSteps,
    next
  );
});

gulp.task('build:without-webpack', next => run(
  'clean',
  'prepare',
  ['copy', 'sass'],
  next
));

gulp.task('eslint', () => {
  return gulp.src([
    'Gulpfile.babel.js',
    'Application/**/*.js',
  ])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
});

gulp.task('watch', ['build:without-webpack'], next => { // eslint-disable-line no-unused-vars
  chokidarWatchRun('Pages/**/*', 'copy:pages');
  chokidarWatchRun('manifest.json', 'copy:manifest');
  chokidarWatchRun('webpack.config.js', () => {
    if (webpackWatcherState !== null) {
      webpackWatcherState.watcher.close(() => {
        webpackWatcherState = null;
        webpackWatcherState.next();
        run('webpack:watch');
      });
    }
  });
  chokidarWatchRun('Styles/**/*', 'sass');
  run('webpack:watch');
});

gulp.task('default', ['build']);
