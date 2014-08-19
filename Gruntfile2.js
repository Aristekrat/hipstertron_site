module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            routing: {
                src: ['portal/js/routes/routing.js'],
                dest: 'portal/js/dist/ct-routing.js',
            },
            controllers: {
                src: ['portal/js/controllers/**/*.js'],
                dest: 'portal/js/dist/ct-controllers.js',
            },
            directives: {
                src: ['portal/js/directives/**/*.js'],
                dest: 'portal/js/dist/ct-directives.js',
            },
            services: {
                src: ['portal/js/services/**/*.js'],
                dest: 'portal/js/dist/ct-services.js',
            },
            ultima: {
                src: [
                    'portal/js/dist/ct-routing.js',
                    'portal/js/dist/ct-controllers.js',
                    'portal/js/dist/ct-directives.js',
                    'portal/js/dist/ct-services.js'
                ],
                dest: 'portal/js/dist/commercialtribe.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                mangle: false
            },
            my_target: {
                files: {
                    'portal/js/dist/ct-controllers-min.js': ['portal/js/dist/ct-controllers.js'],
                    'portal/js/dist/ct-routing-min.js': ['portal/js/dist/ct-routing.js'],
                    'portal/js/dist/ct-directives-min.js': ['portal/js/dist/ct-directives.js'],
                    'portal/js/dist/commercialtribe-min.js': ['portal/js/dist/commercialtribe.js']
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'portal/styles/dist.css': ['portal/styles/**/*.css'] // This line is producing a file, but not a correct file.
                }
            },
            minify: {
                expand: true,
                src: ['portal/styles/dist.css'],
                dest: '',
                ext: '.min.css'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'portal/images', // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
                    dest: 'portal/images' // Destination path prefix
                }]
            }
        },
        /*htmlmin: {
        dist: { 
            options: {                                
                removeComments: true,
                collapseWhitespace: true
            },
            files: {                                   
                'public/index.html': 'public/index.html',
                'public/_comment-form.html': 'public/_comment-form.html',
                'public/_show-comments.html': 'public/_show-comments.html'
            }
        }
    },*/
        plato: {
            my_work: {
                files: {
                    'portal/js/dist/plato/brian': ['portal/js/controllers/admin/*.js',
                        'portal/js/directives/admin/*.js',
                        'portal/js/services/admin/*.js'
                    ],
                    'reports': ['portal/js/dist/plato/brian']
                }
            },
            commercialtribe: {
                files: {
                    'portal/js/dist/plato/commercialtribe': ['portal/js/controllers/**/*.js',
                        'portal/js/directives/**/*.js',
                        'portal/js/services/**/*.js'
                    ],
                    'reports': ['portal/js/dist/plato/commercialtribe']
                }
            },
        },
        complexity: {
            brian: {
                src: ['portal/js/controllers/admin/*.js',
                    'portal/js/directives/admin/*.js',
                    'portal/js/services/admin/*.js'
                ],
                options: {
                    breakOnErrors: true,
                    jsLintXML: 'portal/js/dist/complexity/report.xml', // create XML JSLint-like report
                    checkstyleXML: 'portal/js/dist/complexity/checkstyle.xml', // create checkstyle report
                    errorsOnly: false, // show only maintainability errors
                    cyclomatic: [3, 7, 12], // or optionally a single value, like 3
                    halstead: [8, 13, 20], // or optionally a single value, like 8
                    maintainability: 100
                }
            }
        },
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                src: ['portal/js/dist/*.js'],
                dest: ''
            }
        },
        watch: {
            scripts: {
                files: ['./portal/js/**/*.js'],
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
    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-complexity');
    //  Tasks
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('minify', ['uglify', 'cssmin', 'imagemin']);
    grunt.registerTask('compress', ['compress']);
    grunt.registerTask('complexity', ['complexity']);
    grunt.registerTask('plato', ['plato']);
};