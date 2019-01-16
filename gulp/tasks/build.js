var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

/* spin up our preview server that uses our dist folder as the base */
gulp.task('previewDist', function() {
   browserSync.init({
        /* turns off the black box notifcation in the top right corner */
        notify:false,
        /* needs to tell browserSync where our website lives */
        /* broswerSync spins up a little web server on our computer and it needs to know where that web server should point */
        server: {
            baseDir: "docs"
        }
    });
});

gulp.task('deleteDistFolder', ['icons'], function() {
    return del("./docs");
    });

/* copy files to a new location */
gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
    var pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ];
    /* the first path is selecting any and all contents of the app folder */
    /* qualify that path with additional paths of what we want to exclude */
    /* exclude the html file because we are already taking care of that in the usemin task */
    /* also exclude image files because we already have a task for that */
    /* also exclude our styles. scripts, temp folders and temp contents */
    return gulp.src(pathsToCopy)
        .pipe(gulp.dest("./docs"));
    });

/* copy all of our image files over to the dist folder
/* and also compress the image files before they reach their destination */
gulp.task('optimizeImages', ['deleteDistFolder'], function() {
    /* specify the image files we want to copy */
    /* use the exclamation point to exclude the icons folder */
    /* the visitors of our website don't need the individual image files for each icon */
    /* they only need the single sprite file in the sprites folder */
    /* also exclude any and all subfiles and folders of the icons folder */
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
        /* run the files through a tool that will compress their file size */
        .pipe(imagemin({
            /* to get the most out of this package, we need to enable a few options */
            
            /* this will optimize our jpg images even further */
            progressive: true,
            /* this will help with any git images that we have */
            interlaced: true,
            /* this will help with our svg files */
            multipass: true
        }))
        /* pipe those files to a destination, e.g. the dist folder */
        .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
    gulp.start("usemin");
});

gulp.task('usemin', ['styles', 'scripts'], function() {
    return gulp.src("./app/index.html")
        .pipe(usemin({
            /* tell usemin what we want it to do with our css files, revision and compress them */
            css: [function() {return rev()}, function() {return cssnano()}],
            /* tell usemin what we want it to do with our js files, revision and compress them */
            js: [function() {return rev()}, function() {return uglify()}]
        }))
        .pipe(gulp.dest("./docs"));
});

/* the shortcut that we run in the command line that will trigger and call multiple other tasks */
/* we need to include dependencies in our main build task */
gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);
/* before taking this task out for a spin in our command line, */
/* we first need to import this file within our main gulp.js file in our root */