"use strict"

gulp    = require("gulp")
$       = require("gulp-load-plugins")()

gulp.task "compile-sass", ->
  gulp.src("src/styles/**/*.scss")
    .pipe($.sass(includePaths: [
      require("node-bourbon").includePaths,
      'node_modules'
      ]))
    .pipe gulp.dest("dist")

gulp.task "watch", ->
  gulp.watch "src/styles/**/*.scss", [ "compile-sass" ]

gulp.task "default", ->
  gulp.start "compile-sass"
  gulp.start "watch"