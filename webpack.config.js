var path = require('path');

/* create an object that tells webpack what to do */
module.exports = {
    /* tell webpack which file it should begin looking at to create its bundle */
    /* that's our main App.js file */
    entry: "./app/assets/scripts/App.js",
    /* tell webpack where the final product bundled file should be output to */
    output: {
        /* provide an absolute path to where we want the bundled file to be created */
        /* an absolute path is required so webpack and find the folder on our computer */
        /* this will create an absolute path to a folder on our computer, the scripts folder*/
        path: path.resolve(__dirname, "./app/temp/scripts"),
        filename: "App.js"
    },
    
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                /* webpack is expecting a regular expression for the value of test */
                /* it tells webpack that we only want this babel loader or plugin to be applied to javascript files */
                test: /\.js$/,
                /* not all javascript files in the entire project need to be converted by babel */
                exclude: /node_modules/
            }
        ]
    }
};