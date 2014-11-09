var extname = require('path').extname;
var Metalsmith = require('metalsmith');

var Handlebars = require('handlebars');
var fs = require('fs');

var metadata = require('metalsmith-metadata');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var assets = require('metalsmith-assets');

var metalsmith = Metalsmith(__dirname);
metalsmith.source('./src/content');
metalsmith.destination('./mobile');

metalsmith.use(metadata({
  "films": "data/films.json",
  "themes": "data/themes.json",
  "longforms": "data/muse/longforms.json"
}));

metalsmith.use(markdown({}));

Handlebars.registerPartial('init', fs.readFileSync('./dev/partials/init.html').toString());
Handlebars.registerPartial('panel-filter', fs.readFileSync('./dev/partials/panel-filter.html').toString());
Handlebars.registerPartial('panel-language', fs.readFileSync('./dev/partials/panel-language.html').toString());
Handlebars.registerPartial('panel-share', fs.readFileSync('./dev/partials/panel-share.html').toString());

Handlebars.registerPartial('header', fs.readFileSync('./dev/partials/header.html').toString());
Handlebars.registerPartial('footer', fs.readFileSync('./dev/partials/footer.html').toString());

Handlebars.registerPartial('aside-left', fs.readFileSync('./dev/partials/aside-left.html').toString());
Handlebars.registerPartial('aside-right', fs.readFileSync('./dev/partials/aside-right.html').toString());

Handlebars.registerHelper('TITLE', function() {
  var context = this;
  return new Handlebars.SafeString(
    context.longforms[context.key].headline
  );
});

Handlebars.registerHelper('FOREWORD', function() {
  var items = this.longforms[this.key].content;
  var content = '';

  for (var i = 0; i < items.length; i++) {
    if (items[i].type != 'Foreword') continue;
    content = items[i].content;
    break;
  }

  return new Handlebars.SafeString(
    content
  );
});

var contentTemplates = {
  AJVideo: Handlebars.compile(fs.readFileSync('./dev/partials/video.html').toString()),
  AJQuote: Handlebars.compile(fs.readFileSync('./dev/partials/quote.html').toString()),
  Subheader: function (text) {return '<h2>' + text + '</h2>';},
  Foreword: function (text) {return '';}, //ignore foreword here
  'Body-text': function (text) {return text;}
};

Handlebars.registerHelper('CONTENT', function() {
  var items = this.longforms[this.key].content;
  var content = '';

  for (var i = 0; i < items.length; i++) {
    content += contentTemplates[items[i].type](items[i].content);
  }

  return new Handlebars.SafeString(
    content
  );
});

metalsmith.use(templates({
  "engine": "handlebars",
  "directory": "./dev"
}));

metalsmith.use(assets({
  "source": "./assets",
  "destination": "./assets"
}));

metalsmith.build(function(err){
  if (err) throw err;
});

// "plugins": {
//   "metalsmith-markdown": {},
  // "metalsmith-templates": {
  //   "engine": "handlebars",
  //   "directory": "palestineremix-mobile/dev",
  //   "partials": {
  //     "footer": "footer.html"
  //   }
  // },
//   "metalsmith-assets": {
//     "source": "./public",
//     "destination": "."
//   }