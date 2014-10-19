"use strict"

gulp    = require("gulp")
$       = require("gulp-load-plugins")()

handleError = (err) ->
  console.log err.toString()
  @emit "end"

## Variables

SASSPATHS = [
  require("node-bourbon").includePaths,
  'bower_components'
]
STYLES = [
  "./src/styles/**/*.scss"
]
SCRIPTS = [
  "./bower_components/swiper/dist/idangerous.swiper.min.js"
  # "./bower_components/hyperaudio/dist/assets/scripts/hyperaudio.js"
]

# DEFINE PARTIAL TASKS
# ============================================== #

# HTML tasks
# ---------------------------------------------- #
gulp.task "html", ->
  gulp.src "./dev/*.html"
    .pipe $.connect.reload()

# Compile Sass
# ---------------------------------------------- #
gulp.task "compile-sass", ->
  gulp.src(STYLES)
    .pipe $.sass(includePaths: SASSPATHS)
    .on "error", handleError
    .pipe gulp.dest "dev/styles"
    .pipe $.connect.reload()

# Concat Vendor
# ---------------------------------------------- #
gulp.task "concat-vendor", ->
  gulp.src(SCRIPTS).pipe($.concat("vendor.js")).pipe gulp.dest("./dev/scripts")

# Compile Coffeescript
# ---------------------------------------------- #
gulp.task "compile-coffee", ->
  gulp.src([
    "./src/scripts/helpers/*.coffee",
    "./src/scripts/modules/*.coffee",
    "./src/scripts/scripts.coffee"
    ])
    .pipe $.concat 'aj.coffee'
    .pipe gulp.dest("./dev/scripts")
    .pipe $.coffee
      bare: true
    .on "error", handleError
    .pipe gulp.dest("./dev/scripts")
    .pipe $.connect.reload()

# Copy Font Files from Bower Dependencies
# ---------------------------------------------- #
gulp.task "copyfiles", ->
  gulp.src("./bower_components/hyperaudio/dist/assets/fonts/**/*").pipe gulp.dest("./dev/fonts")

# Watch files
# ---------------------------------------------- #
gulp.task "watch", ->
  gulp.watch STYLES, [ "compile-sass" ]
  gulp.watch ["dev/*.html"], ["html"]
  gulp.watch ["./src/scripts/**/*.coffee", "./src/scripts/*.coffee"], ["compile-coffee"]

# Connect server
# ---------------------------------------------- #
gulp.task "connect", ->
  $.connect.server
    root: "./dev"
    port: 8002
    livereload: true

# DEFAULT TASK
# ============================================== #

gulp.task "default", [
  "compile-sass"
  "concat-vendor"
  "compile-coffee"
  "copyfiles"
  "connect"
  "watch"
]