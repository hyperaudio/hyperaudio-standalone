const L       = 'E';
// L       = process.env.LCODE if process.env.LCODE

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

const handleError = function(err) {
  console.log(err.toString());
  return this.emit("end");
};

//# Variables

const SASSPATHS = [
  require("node-bourbon").includePaths,
  'bower_components'
];
const STYLES = [
  `./src/styles/lang/${L}/loader.scss`
];
// let SCRIPTQ1 = [
//   `./src/scripts/lang/${L}/lang.js`,
//   // "./bower_components/pace/pace.js"
// ];
let SCRIPTQ2 = [
  "./bower_components/xregexp/xregexp-all.js",
  "./bower_components/lunr.js/lunr.min.js",
  // "./bower_components/lunr-languages/lunr.stemmer.support.js",
  // "./bower_components/lunr-languages/lunr.tr.js",
  // "./bower_components/lunr-languages/lunr.ar.js",
  // "./bower_components/tether/tether.js",
  // "./bower_components/shepherd.js/shepherd.js",
  // "./bower_components/drop/drop.js",
  // "./bower_components/swiper/dist/idangerous.swiper.min.js",
  // "./bower_components/fastclick/lib/fastclick.js"
];
let SCRIPTQ3 = [
  "./bower_components/popcorn-js/popcorn.js",
  "./bower_components/popcorn-js/wrappers/common/popcorn._MediaElementProto.js",
  "./bower_components/popcorn-js/wrappers/youtube/popcorn.HTMLYouTubeVideoElement.js",
  "./bower_components/d3-queue/d3-queue.js",
  "./src/scripts/ports/hyperaudio/popcorn-extras.js",
  "./src/scripts/ports/hyperaudio/ha-data.js",
  "./src/scripts/ports/hyperaudio/ha.js",
  "./src/scripts/ports/hyperaudio/ha-wrapper.js"
];


// Compile Sass
// ---------------------------------------------- #
gulp.task("compile-sass", () =>
  gulp.src(STYLES)
    .pipe($.sass({
      includePaths: SASSPATHS,
      outputStyle: "compressed"
    })
  )
    .on("error", handleError)
    .pipe(gulp.dest("dist/assets/styles"))

);

// Concat Vendor
// ---------------------------------------------- #
// gulp.task("concat-vendorq1", () => gulp.src(SCRIPTQ1).pipe($.concat("vendorq1.js")).pipe(gulp.dest("./dist/assets/scripts"))
// );

gulp.task("concat-vendorq2", () => gulp.src(SCRIPTQ2).pipe($.concat("vendorq2.js")).pipe(gulp.dest("./dist/assets/scripts"))
);

gulp.task("concat-ports", () => gulp.src(SCRIPTQ3).pipe($.concat("ports.js")).pipe(gulp.dest("./dist/assets/scripts"))
);


// Compile Coffeescript
// ---------------------------------------------- #
gulp.task("compile-coffee", () =>
  gulp.src([
    "./src/scripts/helpers/*.js",
    "./src/scripts/modules/*.js",
    "./src/scripts/scripts.js",
    `./src/scripts/lang/${L}/*.js`
    ])
    .pipe($.concat('aj.js'))
    .on("error", handleError)
    .pipe(gulp.dest("./dist/assets/scripts"))
);

// Copy Font Files from Bower Dependencies
// ---------------------------------------------- #
gulp.task("copyfiles", () => gulp.src("./bower_components/hyperaudio/dist/assets/fonts/**/*").pipe(gulp.dest("./dist/assets/fonts"))
);

gulp.task("default", [
  "compile-sass",
  // "concat-vendorq1",
  "concat-vendorq2",
  // "concat-vendorqt",
  "concat-ports",
  "compile-coffee",
  "copyfiles",
  // "node-build"
]);
