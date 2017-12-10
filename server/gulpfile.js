const gulp = require('gulp-help')(require('gulp'));
const babel = require('gulp-babel');
const istanbul = require('gulp-istanbul');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');

const noop = function () {
}; // don't stop on error


gulp.task('babel', 'Convert to ES5 syntax', function () {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', 'Check js for code styling violations', function () {
  return gulp.src([
    './src/**/*.js',
    '!./src/config/*.js',
    '!src/**/*.spec.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('server', 'Start the server and watch for file changes', ['lint'], function () {
  nodemon({
    script: './src/server.js',
    watch: './src',
    ext: 'html js',
    ignore: ['ignored.js'],
    tasks: ['lint'],
  })
    .on('restart', function () {
      return console.log('restarting due to changes!');
    });
});

gulp.task('pre-test', 'Config task for tests', function () {
  return gulp.src([
    'src/**/*.js',
    '!./src/server.js',
    '!./src/**/*.spec.js',
    '!./src/config/*.js',
    '!./src/models/**/*.js',
    '!./src/controllers/*.js'])
  // Covering files
    .pipe(istanbul({
      includeUntested: true,
    }))
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test', 'Run tests', ['pre-test'], function () {
  process.env.UNIT_TESTING = true;
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  return gulp.src('src/**/*.spec.js', {read: false})
  // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports())
    // Enforce a coverage of at least 70%
    .pipe(istanbul.enforceThresholds({thresholds: {global: 70}}));
});

gulp.task('watch', false, function () {
  gulp.watch('./src/**/*.js', ['lint', 'test']).on('error', noop);
});
