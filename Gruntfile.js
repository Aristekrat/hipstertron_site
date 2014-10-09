'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'


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
                    dest: 'app/img' // Destination path prefix
                }]
            }
        },
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                src: ['app/dist/hipstertron-min.js'],
                dest: ''
            }
        },
        watch: {
            scripts: {
                files: ['app/js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
        },
    });
    //  Build Plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    //  Tasks
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('minify', ['uglify', 'cssmin', 'imagemin']);
    grunt.registerTask('compress', ['compress']);
};