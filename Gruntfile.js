'use strict';

/*
Installed, need to be implemented: 
https://www.npmjs.org/package/grunt-html-validation
https://www.npmjs.org/package/grunt-contrib-csslint
https://github.com/gruntjs/grunt-contrib-yuidoc
 */

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            all: {
                src: ['app/js/*.js'],
                dest: 'app/dist/hipstertron.js',
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                mangle: false
            },
            my_target: {
                files: {
                    'app/dist/hipstertron-min.js': ['app/dist/hipstertron.js']
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                src: ['app/styling/css/app.css'],
                dest: '',
                ext: '.min.css'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'app/img', // Src matches are relative to this path
                    src: ['/*.{png,jpg,gif}'], // Actual patterns to match
                    dest: 'app/dist/img' // Destination path prefix
                }]
            }
        },
        // The browser isn't understanding gzip files and at the moment it's providing negligible space spavings, so not in use.
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                files: [{
                    expand: true,
                    src: 'app/dist/*.js',
                    dest: '',
                    ext: '.gz.js'
                }]
            }
        },
        // Requires Ruby
        plato: {
            analyze: {
                files: {
                    'app/dist/plato': ['app/js/*.js', 'test/**/*.js']
                }
            }
        },
        csscss: {
            dist: {
                src: ['app/styling/css/app.css']
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        watch: {
            scripts: {
                files: ['app/js/*.js'],
                tasks: ['concat', 'uglify', 'cssmin'],
                options: {
                    spawn: false,
                },
            },
        },
    });
    //  Build Plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    // File size reduction
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    /*    grunt.loadNpmTasks('grunt-contrib-htmlmin');*/
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compress');
    // Testing
    grunt.loadNpmTasks('grunt-karma');
    // Complexity analysis and documentation
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-plato');
    // Quality checking
    grunt.loadNpmTasks('grunt-csscss');
    //  Tasks
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('minify', ['concat', 'uglify', 'cssmin', 'imagemin']);
    // Note - you cannot use the same name as the task, ie 'compress' & 'compress'. Causes a silly but fatal error
    grunt.registerTask('shrink', ['compress']);
    grunt.registerTask('analyze', ['plato']);
    grunt.registerTask('check-static', ['csscss']);
};