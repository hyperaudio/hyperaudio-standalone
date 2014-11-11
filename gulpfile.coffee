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
SCRIPTQ1 = [
  "./bower_components/pace/pace.js"
]
SCRIPTQ2 = [
  "./bower_components/xregexp/xregexp-all.js"
  "./bower_components/lunr.js/lunr.min.js"
  "./bower_components/lunr-languages/lunr.stemmer.support.js"
  "./bower_components/lunr-languages/lunr.tr.js"
  "./bower_components/lunr-languages/lunr.ar.js"
  "./bower_components/tether/tether.js"
  "./bower_components/shepherd.js/shepherd.js"
  "./bower_components/drop/drop.js"
  "./bower_components/swiper/dist/idangerous.swiper.min.js"
  "./bower_components/fastclick/lib/fastclick.js"
]
SCRIPTQ3 = [
  "./bower_components/popcorn-js/popcorn.js"
  "./bower_components/popcorn-js/wrappers/common/popcorn._MediaElementProto.js"
  "./bower_components/popcorn-js/wrappers/youtube/popcorn.HTMLYouTubeVideoElement.js"
  "./bower_components/queue-async/queue.min.js"
  "./src/scripts/ports/hyperaudio/popcorn-extras.js"
  "./src/scripts/ports/hyperaudio/ha-data.js"
  "./src/scripts/ports/hyperaudio/ha.js"
  "./src/scripts/ports/hyperaudio/ha-wrapper.js"
]
TERRIBLESCRIPTQ = [
  "./bower_components/newsquiz/libs/jquery/jquery.js"
  "./bower_components/newsquiz/libs/tabletop.js"
  "./bower_components/newsquiz/dist/newsquiz.min.js"
]

# DEFINE PARTIAL TASKS
# ============================================== #

# HTML tasks
# ---------------------------------------------- #
gulp.task "html", ->
  gulp.src ["./dev/**/*.html"]
    .pipe $.connect.reload()

# Compile Sass
# ---------------------------------------------- #
gulp.task "compile-sass", ->
  gulp.src(STYLES)
    .pipe $.sass(
      includePaths: SASSPATHS
      outputStyle: "compressed"
    )
    .on "error", handleError
    .pipe gulp.dest "dev/assets/styles"
    .pipe $.connect.reload()

# Concat Vendor
# ---------------------------------------------- #
gulp.task "concat-vendorq1", ->
  gulp.src(SCRIPTQ1).pipe($.concat("vendorq1.js")).pipe gulp.dest("./dev/assets/scripts")

gulp.task "concat-vendorq2", ->
  gulp.src(SCRIPTQ2).pipe($.concat("vendorq2.js")).pipe gulp.dest("./dev/assets/scripts")

gulp.task "concat-ports", ->
  gulp.src(SCRIPTQ3).pipe($.concat("ports.js")).pipe gulp.dest("./dev/assets/scripts")

gulp.task "concat-vendorqt", ->
  gulp.src(TERRIBLESCRIPTQ).pipe($.concat("vendorqt.js")).pipe gulp.dest("./dev/assets/scripts")

# Compile Coffeescript
# ---------------------------------------------- #
gulp.task "compile-coffee", ->
  gulp.src([
    "./src/scripts/helpers/*.coffee",
    "./src/scripts/modules/*.coffee",
    "./src/scripts/scripts.coffee"
    ])
    .pipe $.concat 'aj.coffee'
    .pipe gulp.dest("./dev/assets/scripts")
    .pipe $.coffee
      bare: true
    .on "error", handleError
    .pipe gulp.dest("./dev/assets/scripts")
    .pipe $.connect.reload()

# Copy Font Files from Bower Dependencies
# ---------------------------------------------- #
gulp.task "copyfiles", ->
  gulp.src("./bower_components/hyperaudio/dist/assets/fonts/**/*").pipe gulp.dest("./dev/assets/fonts")

# Build Dist
# ---------------------------------------------- #
gulp.task("node-build", $.shell.task ([
  'node build'
]))

# Watch files
# ---------------------------------------------- #
gulp.task "watch", ->
  gulp.watch STYLES, [ "compile-sass", "node-build" ]
  gulp.watch ["./dev/**/*.html"], ["html", "node-build"]
  gulp.watch ["./src/scripts/**/*.coffee", "./src/scripts/*.coffee", "./bower_components/**/*.js"], ["compile-coffee", "node-build"]
  gulp.watch SCRIPTQ3, ["concat-ports", "node-build"]
  gulp.watch ["./dev/assets/**/*.*"], ["node-build"]

# Connect server
# ---------------------------------------------- #
gulp.task "connect", ->
  $.connect.server
    root: "./mobile"
    port: 8002
    livereload: true

# DEFAULT TASK
# ============================================== #

gulp.task "default", [
  "compile-sass"
  "concat-vendorq1"
  "concat-vendorq2"
  "concat-vendorqt"
  "concat-ports"
  "compile-coffee"
  "copyfiles"
  "node-build"
  "connect"
  "watch"
]