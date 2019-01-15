var gulp = require('gulp'),
webpack = require('webpack');

/* add the modernizr task as a dependency */
gulp.task('scripts', ['modernizr'], function(callback) {
    /* when we run webpack programmatically like this within a gulp task, */
    /* webpack needs help finding the webpack config file */
    /* provide a path to the config file relative from our tasks file */
    webpack(require('../../webpack.config.js'), function(err, stats) {
        /* within the above parenthesis for the anonymous function, webpack actually gives us access to 2 parameters */
        /* if there is an error, log out to the console the error message */
        if (err) {
            console.log(err.toString());
        }
        console.log(stats.toString());
        /* make sure gulp is aware when webpack completes */
        /* we can do this by passing callback into our main task function signature */
        /* and within webpack's callback function, after we log out this success text to the console, */
        /* let's simply run that callback function so gulp can be certain that webpack completed */
        callback();
    });
    

});