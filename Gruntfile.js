/**
 * Created by massimo on 2/20/15.
 */
module.exports = function(grunt) {

    require('time-grunt')(grunt);   // this shows the bar graph after running the grunt command

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist_folder: {
                files: [{
                    src: [
                        'dist/{,}*',
                        'foo/{,}*'
                    ]
                }]
            }
        },
        wiredep: {
            inject_bower: {
                src: ['index.html']
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions']
            },
            add_css_prefix: {
                files: [{
                    src: 'css/style.css',
                    dest: 'dist/pre.css'
                }]
            }
        },
        concat:{
            basic: {
                src: ['js/views/cartcollectionview.js', 'js/views/itemcollectionview.js'],
                dest: 'dist/concat/built.js'
            }
        },
        copy: {
            main: {
                src: 'css/*',
                dest: 'dist/'
            }
        },
        cssmin: {
            dist: {
                files:[
                    {
                        src: 'css/style.css',
                        dest: 'dist/style-min.css'

                    }
                ]
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files:[
                    {
                        src:'js/models/item.js',
                        dest:'dist/itemMin.js'
                    }
                ]
            }
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                files: [
                    {
                        src: ['dist/pre.css', 'dist/itemMin.js', 'dist/style-min.css']
                    }
                ]

            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true
            },
            all: ['Gruntfile.js']
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,

                    src: ['index.html'],
                    dest: 'dist/'
                }]
            }
        },
        less: {
            compile_less: {
                options: {
                },
                files: [
                    {
                        src: 'less/styles.less',
                        dest: 'dist/compiledless.css'
                    }
                ]
            }
        },
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('mass_build', [
        'clean',
        'wiredep',
        'autoprefixer',
        'concat',
        'copy',
        'cssmin',
        'uglify',
        'filerev',
        'htmlmin',
        'less'
    ]);



};