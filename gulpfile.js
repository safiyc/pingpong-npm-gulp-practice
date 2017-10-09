// when using 'require' function, it's standard practice to declare var name the same as the package name (ex. var 'gulp'), but a different var name will not break the code.
// when defining a variable for 'require', it's standard practice to put them on the top of page; the ordering of requires has no importance other than for readability

// 'del' delete folders 'build' and 'tmp' to clean our environment each time(?)
var del = require('del');
// 'gulp-util' let us separate development tasks from production build tasks
var utilities = require('gulp-util');
var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
//removes unnecessary characters from code bc browser doesnt care for them:
var uglify = require('gulp-uglify');
// this is a 'linter' tool, used to analyzes code and warns about parts that dont follow stylistic conventions, or could cause possible bugs:
var jshint = require('gulp-jshint');

var buildProduction = utilities.env.production;

// 'task' is a method defined in the gulp package; 'task' takes 2 arguments (name of task as string object; the function to run task)
// gulp.task('myTask', function() {
//   console.log('hello gulp');
// });
// run above code in terminal, ex:  'gulp myTask'

// gulp.task('jsBrowserify', function() {
//   return browserify({ entries: ['./js/pingpong-interface.js'] })
//   .bundle()
//   .pipe(source('app.js'))
//   .pipe(gulp.dest('./build/js'));
// });

// above is a chain of function calls:
// first, browserify function is called to browserify a file by passing key 'entries' on file 'ping-pong-interface.js'
// second, we call 'bundle()', which is included in the Browserify package
// 'pipe(source())' is function used to create a new file (ex. 'app.js')
// 'pipe(gulp.dest())' is function used to create new folders (ex. 'build', and 'js' folder inside 'build', 'app.js' file insided 'js')

// when above is run in terminal ('gulp jsBrowserify'), a new folder called 'build' is created (along with 'js' folder and 'app.js' file) in project directory

// when changes are made in files (ex. pingpong.js file), need to run 'gulp jsBrowserify' again so browser gets updated code

// this combines the files into a file called 'allConcat.js'
// gulp.task('concatInterface', function() {
//   return gulp.src(['./js/pingpong-interface.js', './js/signup-interface.js'])
//     .pipe(concat('allConcat.js'))
//     .pipe(gulp.dest('./tmp'));
// });

gulp.task('clean', function() {
  return del(['build', 'tmp']);
});

// this is updated code for above 'concatInterface' to implement '*' in file path
gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    // places file in this newly created folder:
    .pipe(gulp.dest('./tmp'));
});

// this is updated code for above 'jsBrowserfiy' with 'concatInterface' task added
gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    // creates a file 'app.js':
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/app.js")
    // removes unnecessary characters:
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

// 'build' - we don't want to run all the above tasks while app is in development (unnecessary processing time), therefore, we can tell gulp to ignore certain tasks until app is a production build
// 'clean' - we want to clean the environment (delete folders 'build', 'tmp') each time we make a production or a development build
gulp.task('build', function() {
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
});

// in terminal - run 'gulp build' or 'gulp build --production', and different tasks will run ('production' runds 'minisfyScripts, along with other tasks')

gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
