LIVERELOAD_PORT = 35729
lrSnippet = require("connect-livereload")(port: LIVERELOAD_PORT)
mountFolder = (connect, dir) ->
  connect.static require("path").resolve(dir)

module.exports = (grunt) ->
  
  # Project configuration.
  BANNER =  "/* Phubo : " + (Date.now()).toString() + " */"
  GROUPS = {
    "app":"Phubo"
  }
  BIN='phubo'
  PROJECT_NAME='Phubo'
  BUILDPATH='build/'
  DISTPATH='dist/'
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    
    toaster:
      debug:
        minify: false
        packaging: true
        # bare: true
        folders: GROUPS
        release: "#{DISTPATH}/#{BIN}.js"
      minified:
        minify: true
        packaging: true
        # bare: true
        folders: GROUPS
        release: "#{DISTPATH}/#{BIN}.min.js"
        
    handlebars:
      all:
        options:
          namespace: "#{BIN}.Templates"
          processName: (filePath) ->
              filePath.replace(/^Phubo\/assets\/templates\//, "").replace /\.hbs$/, ""
        files:
          '#{DISTPATH}/assets/templates/#{BIN}.templates.js': ["app/assets/templates/**/*.hbs"]
          
    sass:
      dist:
        options:
          style: "expanded"
        files:[{
          expand: true
          cwd: 'assets/style'
          src: ['**/*.scss']
          dest: 'build/assets/style'
          ext: '.css'
          }]
          
    cssmin:
      dist:
        options:
          banner: '/* Phubo */'
        files:
          "dist/assets/style/phubo.min.css": ["build/assets/style/**/*.css"]
      
    copy:
      app:
        files: [
          {
            expand: true
            flatten: true
            src: ["assets/img/*"]
            dest: "#{DISTPATH}/assets/img/"
            filter: "isFile"
          }
          {
            expand: true
            flatten: true
            src: ["app/**/*.html"]
            dest: "#{DISTPATH}"
            filter: "isFile"
          }
          {
            expand: true
            cwd: "vendor/"
            src: "**/*"
            dest: "#{DISTPATH}/vendor/"
            filter: "isFile"
          }
        ]

    clean:
      app:
        src: ["build", "dist"]

    # this, is orgasmically neat
    watch:
      bower:
        files: ["vendor/*"]
        tasks: ["copy:app"]

      coffee:
        files: ["app/**/*.coffee"]
        tasks: ["build"]

      scss:
        files: ["assets/style/**/*.scss"]
        tasks: ["style"]

      img:
        files: ["assets/img/**/*.{png,jpg,jpeg,gif}"]
        tasks: ["copy:app"]

      html:
        files: ["app/**/*.html"]
        tasks: ["copy:app"]

      livereload:
        options:
          livereload: LIVERELOAD_PORT

        files: ["dist/**/*"]

    connect:
      options:
        port: 9494
        hostname: "0.0.0.0"

      livereload:
        options:
          middleware: (connect) ->
            [
              lrSnippet
              mountFolder(connect, "dist")
            ]

    open:
      server:
        path: "http://localhost:<%= connect.options.port %>"
     
    shell:  
      createDist:
        command: "mkdir dist"
        options:
          stdout: true,
          failOnError: true
       
      createBuild:
        command: "mkdir build"
        options:
          stdout: true,
          failOnError: true
  
  # Load plugins
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-open"
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks 'grunt-shell'
  grunt.loadNpmTasks "grunt-coffee-toaster"
  grunt.loadNpmTasks 'grunt-contrib-handlebars'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  
  # Tasks
  grunt.registerTask "build", [
    "clean"
    "shell:createBuild"
    "shell:createDist"
    "handlebars"
    "style"
    "toaster"
    "copy"
  ]
  grunt.registerTask "style", [
    "sass"
    "cssmin"
  ]
  grunt.registerTask "server", (target) ->
    if target is "build"
      return grunt.task.run([
        "build"
        "open"
        "connect:dist:keepalive"
      ])
    grunt.task.run [
      "build"
      "connect:livereload"
      "open"
      "watch"
    ]
    return

  grunt.registerTask "default", ["build"]
  return