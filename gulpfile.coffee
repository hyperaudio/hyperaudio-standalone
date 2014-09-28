"use strict"

gulp    = require("gulp")
$       = require("gulp-load-plugins")()

handleError = (err) ->
  console.log err.toString()
  @emit "end"

# DEFINE PARTIAL TASKS
# ============================================== #

# HTML tasks
# ---------------------------------------------- #
gulp.task "html", ->
  gulp.src "*.html"
    .pipe $.connect.reload()

# Compile Sass
# ---------------------------------------------- #
gulp.task "compile-sass", ->
  gulp.src("./src/styles/**/*.scss")
    .pipe $.sass(includePaths: [
      require("node-bourbon").includePaths,
      'bower_components'
      ])
    .on "error", handleError
    .pipe gulp.dest "dist/styles"
    .pipe $.connect.reload()

# Concat Vendor
# ---------------------------------------------- #
gulp.task "concat-vendor", ->
  gulp.src([
    "./bower_components/jquery/dist/jquery.js"
    "./bower_components/swiper/src/idangerous.swiper.js"
  ]).pipe($.concat("vendor.js")).pipe gulp.dest("./dist/scripts")

# Compile Coffeescript
# ---------------------------------------------- #
gulp.task "compile-coffee", ->
  gulp.src([
    "./src/scripts/modules/*.coffee",
    "./src/scripts/scripts.coffee"
    ])
    .pipe $.concat 'aj.coffee'
    .pipe gulp.dest("./dist/scripts")
    .pipe $.coffee
      bare: true
    .on "error", handleError
    .pipe gulp.dest("./dist/scripts")
    .pipe $.connect.reload()

# Watch files
# ---------------------------------------------- #
gulp.task "watch", ->
  gulp.watch "./src/styles/**/*.scss", [ "compile-sass" ]
  gulp.watch ["*.html"], ["html"]
  gulp.watch ["./src/scripts/**/*.coffee", "./src/scripts/*.coffee"], ["compile-coffee"]

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
  "concat-vendor"
  "compile-coffee"
  "connect"
  "watch"
]