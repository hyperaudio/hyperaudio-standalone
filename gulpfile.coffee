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
    "./bower_components/swiper/src/idangerous.swiper.js"
    "./bower_components/hyperaudio/dist/assets/scripts/vendor.js"
    "./bower_components/hyperaudio/dist/assets/scripts/hyperaudio.js"
  ]).pipe($.concat("vendor.js")).pipe gulp.dest("./dist/scripts")

# Minify
# ---------------------------------------------- #
gulp.task "compress-js", ->
  gulp.src([
    "dist/scripts/vendor.js",
    "dist/scripts/aj.js"
  ]).pipe(
    $.uglifyjs("scripts.js",
      mangle: false
      output:
        beautify: false
  )).pipe gulp.dest("dist/scripts")

# Compile Coffeescript
# ---------------------------------------------- #
gulp.task "compile-coffee", ->
  gulp.src([
    "./src/scripts/helpers/*.coffee",
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

# Copy Font Files from Bower Dependencies
# ---------------------------------------------- #
gulp.task "copyfiles", ->
  gulp.src("./bower_components/hyperaudio/dist/assets/fonts/**/*").pipe gulp.dest("./dist/fonts")

# Watch files
# ---------------------------------------------- #
gulp.task "watch", ->
  gulp.watch "./src/styles/**/*.scss", [ "compile-sass" ]
  gulp.watch ["dist/*.html"], ["html"]
  gulp.watch ["dist/vendor.js", "dist/aj.js"], ["compress-js"]
  gulp.watch ["./src/scripts/**/*.coffee", "./src/scripts/*.coffee"], ["compile-coffee"]

# Connect server
#
gulp.task "connect", ->
  $.connect.server
    root: "./dist"
    port: 8002
    livereload: true

# DEFAULT TASK
# ============================================== #

gulp.task "default", [
  "compile-sass"
  "concat-vendor"
  "compile-coffee"
  "compress-js"
  "copyfiles"
  "connect"
  "watch"
]