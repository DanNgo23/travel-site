var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
hexrgba = require('postcss-hexrgba');

gulp.task('styles', function () {
    return gulp.src('./app/assets/styles/styles.css')
        /* postcss() is expecting an array */
        /* postcss manipulates the contents of a file in any way that we please */
        .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
        /* by default, when an error occurs, all gulp tasks are ended (included the gulp watch task) */
        /* we want to end things on a positive note, even if an error happens */
        /* the first argument in the on function is the name of the event that we are interested in */
        .on('error', function (errorInfo) {
            /* log out to the console any error info that gulp might have for us */
            /* without this, there will be no error message when gulp ends in the command line */
            /* there will be a lot of info given, so we use to.String() to make the error message more human friendly to digest */
            console.log(errorInfo.toString());
            /* we want to emit out to gulp that it tried it's best but now it's time to bring things to an end */
            this.emit('end');
            })
        .pipe(gulp.dest('./app/temp/styles'));
});