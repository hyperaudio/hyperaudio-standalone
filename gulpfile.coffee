"use strict"

gulp    = require("gulp")
$       = require("gulp-load-plugins")()

# DEFINE PARTIAL TASKS
# ============================================== #

# HTML tasks
#
gulp.task "html", ->
  gulp.src("./app/*.html").pipe $.connect.reload()

# Compile Sass
#
gulp.task "compile-sass", ->
  gulp.src("./src/styles/**/*.scss")
    .pipe($.sass(includePaths: [
      require("node-bourbon").includePaths,
      'node_modules'
      ]))
    .pipe gulp.dest("assets/styles")
    .pipe $.connect.reload()

# Watch files
#
gulp.task "watch", ->
  gulp.watch "./src/styles/**/*.scss", [ "compile-sass" ]
  gulp.watch ["./app/*.html"], ["html"]

# Connect server
#
gulp.task "connect", ->
  $.connect.server
    root: "."
    livereload: true

# DEFAULT TASK
# ============================================== #

gulp.task "default", [
  "compile-sass"
  "connect"
  "watch"
]