var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function() {
    
    browserSync.init({
        /* turns off the black box notifcation in the top right corner */
        notify:false,
        /* needs to tell browserSync where our website lives */
        /* broswerSync spins up a little web server on our computer and it needs to know where that web server should point */
        server: {
            baseDir: "app"
        }
    });
    
    /* the first argument is the file on our computer that we want to watch for saved changes to */
    /* the second argument is what we want it to actually do */
    watch('./app/index.html', function() {
        browserSync.reload();
    });
    
    /* any time we save a change to any css file, we no longer trigger the styles task */
    /* in an updated code, we trigger the cssInject task */
    /* we now build that cssInject task in such a way that it won't even begin until the styles task has the chance to run and complete */
    /* so that way the compiled css file styles.css will have had a chance to be generated */
    /* and only at that point will we pipe it in to browserSync */
    watch('./app/assets/styles/**/*.css', function() {
        /* gulp.start('styles'); */
        gulp.start('cssInject');
    });
    
    /* watch for any changes to any of our javascript files */
    watch('./app/assets/scripts/**/*.js', function() {
        /* begin or start up our scriptsRefresh task */
        gulp.start('scriptsRefresh');
    });
});

/* before gulp run our cssInject task, we tell it to begin and complete any dependency task that we list in the second argument */
/* the styles task is a dependency of the inject task */
gulp.task('cssInject', ['styles'], function() {
    /* we want to take the contents of our compiled css file
    /* and hand that over to browserSync so it can inject those styles into the page on the fly */
    /* gulp.src points to our compiled css file */
    /* we want to pipe the contents of the css file into browserSync */
    /* the stream method will make whatever we are piping into it available in the browser*/
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

/* we don't want to reload the page until the new webpack bundled file has had a chance to be generated */
/* so we will do is tell gulp the sciptsRefresh task has a dependency of our main scripts task */
/* so now, the scriptsRefresh task won't begin until our main scripts task has had a chance to begin and complete */
gulp.task('scriptsRefresh', ['scripts'], function() {
    /* tell browserSync to reload the page */
    browserSync.reload();
});