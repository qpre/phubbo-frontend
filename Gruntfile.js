'use strict';

module.exports = function(grunt) {
  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [
            ["babelify", {
              compact: false
            }]
          ]
        },
        files: {
          'dist/phubo.js': 'app/src/application.js'
        }
      }
    },

    concat: {
      css: {
        files: {
          'dist/phubo.scss' : ['app/assets/style/*.scss']
        }
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        src: 'dist/phubo.scss',
        dest: 'dist/phubo.css'
      }
    },

    copy: {
      dist: {
        files: {
          'dist/index.html': 'app/index.html',
          'dist/assets/img/home-bg.jpg': 'app/assets/img/home-bg.jpg'
        }
      }
    },

    jscs: {
      src: ['app/src/**/*.js'],
      options: {
        esnext: true,
        verbose: true
      }
    },

    // grunt-contrib-connect will serve the files of the project
    // on specified port and hostname
    connect: {
      all: {
        options:{
          port:     9000,
          hostname: "0.0.0.0",
          base:     'dist',

          // Livereload needs connect to insert a cJavascript snippet
          // in the pages it serves. This requires using a custom connect middleware
          middleware: function(connect, options, middlewares) {
            return [
              // Load the middleware provided by the livereload plugin
              // that will take care of inserting the snippet
              require('grunt-contrib-livereload/lib/utils').livereloadSnippet,

              // Serve the project folder
              connect.static(options.base[0])
            ];
          }
        }
      }
    },

    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= connect.all.options.port%>'
      }
    },

    // grunt-regarde monitors the files and triggers livereload
    // Surprisingly, livereload complains when you try to use grunt-contrib-watch instead of grunt-regarde
    regarde: {
      es6: {
        files:['app/src/**/*.js'],
        tasks: ['browserify', 'livereload']
      },

      styles: {
        files:['app/assets/**/*.scss'],
        tasks: ['concat:css', 'sass', 'livereload']
      },

      html: {
        files:['app/index.html'],
        tasks: ['copy', 'livereload']
      },
    },

    clean: {
      es6:    ['dist/phubo.js'],
      styles: ['dist/phubo.css', 'dist/phubo.scss'],
      html:   ['dist/index.html'],
      all:    ['dist']
    }
  });

  grunt.registerTask('build',[
    'browserify',
    'concat:css',
    'sass',
    'copy'
  ]);

  // Creates the `server` task
  grunt.registerTask('server', [
    'build',
    // Starts the livereload server to which the browser will connect to
    // get notified of when it needs to reload
    'livereload-start',
    'connect',
    // Connect is no longer blocking other tasks, so it makes more sense to open the browser after the server starts
    'open',
    // Starts monitoring the folders and keep Grunt alive
    'regarde'
  ]);

  grunt.registerTask('default', ['build']);
}
