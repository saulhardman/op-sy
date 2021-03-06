module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: grunt.file.readJSON('config.json'),
        jshint: {
            files: ['js/*.js', '!js/*.min.js']
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'js',
                    mainConfigFile: 'js/main.js',
                    name: 'main',
                    include: ['../components/almond/almond.js'],
                    out: 'js/main.min.js'
                }
            }
        },
        compass: {
            compile: {}
        },
        concat: {
            main: {
                files: {
                    'css/main.css': ['css/main.css', 'components/magnific-popup/dist/magnific-popup.css']
                }
            }
        },
        cssmin: {
            main: {
                files: {
                    'css/main.css': 'css/main.css'
                }
            }
        },
        watch: {
            compass: {
                files: 'sass/**/*.{sass,scss}',
                tasks: ['compass', 'concat', 'cssmin']
            }
        },
        strip: {
            main: {
                options: {
                    inline: true
                },
                src: 'js/main.min.js'
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/img/'
                }]
            }
        },
        clean: {
            dist: {
                src: ['dist/']
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    src: ['style.css', 'screenshot.png', 'css/*', '*.php', 'external/**/*.php', 'parts/**/*.php', 'js/**/*.min.js'],
                    dest: 'dist/'
                }]
            }
        },
        compress: {
            dist: {
                options: {
                    archive: '<%= pkg.name %>-v<%= pkg.version %>.zip'
                },
                expand: true,
                cwd: 'dist/',
                src: ['**/*']
            }
        },
        shell: {
            importDatabase: {
                options: {
                    stdout: true
                },
                command: '/Applications/MAMP/Library/bin/mysql -p -u <%= config.database.user %> <%= config.database.name %> < database/wordpress.sql'
            },
            exportDatabase: {
                options: {
                    stdout: true
                },
                command: '/Applications/MAMP/Library/bin/mysqldump -p -u <%= config.database.user %> <%= config.database.name %> --ignore-table=<%= config.database.name %>.wp_users > database/wordpress.sql'
            }
        },
        modernizr: {
            devFile: 'components/modernizr/modernizr.js',
            outputFile: 'js/vendor/modernizr.min.js',
            extra: {
                load: false
            },
            files: [
                'js/main.min.js',
                'css/main.css'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-strip');
    grunt.loadNpmTasks('grunt-modernizr');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('importDatabase', ['shell:importDatabase']);
    grunt.registerTask('exportDatabase', ['shell:exportDatabase']);

    grunt.registerTask('build', ['compass',
                                 'jshint',
                                 'requirejs',
                                 'strip',
                                 'modernizr',
                                 'clean',
                                 'copy',
                                 'imagemin',
                                 'compress',
                                 'clean'
                                ]);

};