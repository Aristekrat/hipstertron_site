'use strict';

/*
 * Build Script TODO
 * Get rev + lazy load working
 * Get compress working
 * Make the sass compilation process a bit more efficent, atm requires a full html build + inlining
 * Make local dev a little bit less prod-like
 */

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dir: {
            build: 'app/dist',
            dev: 'app',
            styling: 'styling',
            scripts: 'js',
            image: 'img',
        },

        // Optimization Tasks
        concat: {
            hipstertron: {
                src: ['app/vendor/afkl-lazy-image/release/lazy-image.min.js', 'app/js/*.js'],
                dest: '<%= dir.build %>/<%= dir.scripts %>/hipstertron.js',
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                mangle: false
            },
            my_target: {
                files: {
                    '<%= dir.build %>/<%= dir.scripts %>/hipstertron-min.js': ['<%= dir.build %>/<%= dir.scripts %>/hipstertron.js']
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            dist: {
                files: {
                    '<%= dir.build %>/<%= dir.styling %>/app.min.css': ['<%= dir.dev %>/<%= dir.styling %>/app.css']
                }
            }
        },
        imagemin: {
            release: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: ['./<%= dir.image %>/*.{png,jpg,gif}'],
                    dest: '<%= dir.build %>'
                }],
                options: {
                    progressive: true,
                    optimizationLevel: 6
                },
            }
        },
        htmlmin: {
            index: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    '<%= dir.build %>/index-min.html': '<%= dir.dev %>/index.html',
                }
            },
            partials: {
                files: [{
                    expand: true,
                    cwd: 'app/',
                    src: 'partials/*.html',
                    dest: '<%= dir.build %>/',
                }]
            }
        },
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                files: [{
                    expand: true,
                    src: '<%= dir.build %>/*.js',
                    dest: '',
                    ext: '.gz.js'
                }]
            }
        },
        inline: {
            dist: {
                src: '<%= dir.build %>/index-min.html'
            }
        },

        // Testing Tasks
        nightwatch: {
            options: { /* see below */ }
        },
        plato: {
            analyze: {
                files: {
                    '<%= dir.build %>/plato': ['<%= dir.dev %>/<%= dir.scripts %>/**/*.js']
                }
            }
        },
        jshint: {
            options: {
                '-W097': true, // Use the function form of use strict error. Suppressed because I just don't want to bother.
                '-W069': true, // preference for dot notation when defining objects error. I know what I'm doing jshint.
                '-W117': true, // 'var' is not defined error. Very useful error but jshint identifies way too many false positives.
            },
            client: ['app/js/**.js'],
            server: ['lib/routes.js', 'lib/scripts/**.js', 'lib/controllers/**.js', 'lib/config/**.js']
        },

        // Utility 
        sprite: {
            all: {
                src: 'app/<%= dir.image %>/raw/*.png',
                dest: 'app/<%= dir.image %>/master_sprite.png',
                destCss: 'app/<%= dir.styling %>/sprites.css'
            }
        },

        // Build Tasks
        clean: {
            js: '<%= dir.build %>/<%= dir.scripts %>/*.js',
            css: '<%= dir.build %>/<%= dir.styling %>/*.css',
            html: ['<%= dir.build %>/index-min.html', '<%= dir.build %>/partials/*.html'],
            img: '<%= dir.build %>/<%= dir.image %>/**/*.{png,jpg,gif}',
        },
        rev: {
            options: {
                algorithm: 'md5',
                length: 8
            },
            assets: {
                files: [{
                    src: [
                        '<%= dir.build %>/<%= dir.image %>/*.{jpg,jpeg,gif,png}',
                        '<%= dir.build %>/app/<%= dir.styling %>/*.css',
                        '<%= dir.build %>/<%= dir.scripts %>/*.js',
                    ]
                }]
            }
        },
        useminPrepare: {
            html: ['app/index.html', 'app/partials/*.html'],
            options: {
                assetsDirs: [
                    '<%= dir.build %>/<%= dir.image %>/*.{jpg,jpeg,gif,png}',
                    '<%= dir.build %>/<%= dir.styling %>/*.css',
                    '<%= dir.build %>/<%= dir.scripts %>/*.js',
                ],
            },
        },
        usemin: {
            html: ['<%= dir.build %>/index-min.html', '<%= dir.build %>/partials/*.html']
        },
        bump: {
            options: {
                commit: true,
                createTag: true,
                push: true,
                pushTo: '<%= pkg.repository.url %>'
            }
        },

        // Task Runners
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            }
        },
        sass: {
            options: {
                quiet: true
            },
            dist: {
                files: {
                    'app/<%= dir.styling %>/app.css': 'app/<%= dir.styling %>/app.scss'
                }
            }
        },
        watch: { // TODO add test client, test server
            client_scripts: {
                files: ['app/js/*.js', 'Gruntfile.js'],
                tasks: ['jshint:client', 'buildjs'],
                options: {
                    spawn: false,
                },
            },
            server_scripts: {
                files: ['lib/**/*.js'],
                tasks: ['jshint:server'],
            },
            html: {
                files: ['app/index.html', 'app/partials/*.html'],
                tasks: 'buildhtml'
            },
            styling: {
                files: ['app/<%= dir.styling %>/*.scss'],
                tasks: 'buildcss'
            },
            livereload: {
                options: {
                    livereload: true,
                    quiet: true,
                    silent: true,
                },
                files: [
                    'app/**/*.{css,js,html}',
                ]
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
    grunt.loadNpmTasks('grunt-inline');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-nightwatch');
    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-sass');

    //  Tasks
    grunt.registerTask('default', ['concurrent:dev']);
    grunt.registerTask('minify', ['concat', 'uglify', 'cssmin', 'imagemin']);
    grunt.registerTask('shrink', ['compress']);
    grunt.registerTask('analyze', ['plato']);
    grunt.registerTask('cleanall', ['clean:js', 'clean:css', 'clean:html']);
    grunt.registerTask('buildjs', ['clean:js', 'concat:hipstertron', 'uglify']);
    grunt.registerTask('buildcss', ['clean:css', 'sass', 'cssmin', 'buildhtml']);
    grunt.registerTask('buildhtml', ['clean:html', 'htmlmin', 'inline']);
    grunt.registerTask('buildimg', ['clean:img', 'imagemin']);
    grunt.registerTask('build', ['buildjs', 'buildhtml', 'buildcss', 'buildimg']);

    // Not using this atm. Usemin has difficulty seeing the lazyloaded images in main.html. Will return and fix later. 
    grunt.registerTask('useminBuild', [
        'useminPrepare',
        'build',
        'rev',
        'usemin'
    ]);

};