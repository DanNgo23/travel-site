/* these are dummy tasks; we no longer need them 
var gulp = require('gulp'),
watch = require('gulp-watch');

 the first argument in task is what we want the task to be named 
 the second argument is what we want to happen when this task runs

gulp.task('default', function() {
    console.log("Hooray - you created a Gulp task.");
});

gulp.task('html', function () {
    console.log("Imagine something useful being done to your HTML here.");
});
*/

/* don't need to use the .js at the end of the file that we are requiring */
require('./gulp/tasks/styles');
require('./gulp/tasks/watch');
require('./gulp/tasks/sprites');
require('./gulp/tasks/scripts');

