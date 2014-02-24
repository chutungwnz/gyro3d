var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var typescript = require('gulp-tsc');
//var jade = require('gulp-jade');

var paths = {
  scripts: ['src/ts/client/**/*.ts']
};
 
var brConfig = {
  //transform: ['typeify'],
  //extensions: ['.ts'],
  shim: {
    angular: {
      path: './bower_components/angular/angular.js',
      exports: 'angular'
    },
    ngRoute: {
      path: './bower_components/angular-route/angular-route.js',
      exports: 'ngRoute'
    },
    ngSocket: {
      path: './bower_components/angular-socket-io/socket.js',
      exports: 'socketFactory'
    },
    threejs: {
      path: './bower_components/threejs/build/three.min.js',
      exports: 'THREE'
    }
  },
  debug: true
};

gulp.task('compileClient', function(){
  gulp.src(['src/ts/client/**/*.ts', 'src/ts/client/directives/*.ts'])
    .pipe(typescript({ emitError: false }))
    .pipe(gulp.dest('tmp/'));
});

var browserifier = function() {
  gulp.src('./tmp/app.js', { read: false })
    .pipe(browserify(brConfig))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./public/js/'));
};

gulp.task('compileServer', function(){
  gulp.src(['src/ts/server/**/*.ts'])
    .pipe(typescript({ emitError: false }))
    .pipe(gulp.dest('./build'));
});

gulp.task('compileJade', function() {
  gulp.src('views/**/*.jade')
    //.pipe(jade())
    .pipe(gulp.dest('public/views/'));
});

gulp.task('scripts', browserifier);
 
gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['compile', 'scripts']);
});
 
gulp.task('default', ['compileClient', 'scripts', 'compileServer', 'compileJade']);



