var L = 'E'
if (process.env.LCODE) L = process.env.LCODE;

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
metalsmith.destination('./mobile-' + L);

metalsmith.use(metadata({
  "L": "data/" + L + "/language.json",
  "films": "data/" + L + "/films.json",
  "themes": "data/" + L + "/themes.json",
  "nav": "data/" + L + "/nav.json"
}));

metalsmith.use(markdown({}));

Handlebars.registerPartial('init', fs.readFileSync('./dev/partials/init-' + L + '.html').toString());
Handlebars.registerPartial('panel-filter', fs.readFileSync('./dev/partials/panel-filter.html').toString());
Handlebars.registerPartial('panel-language', fs.readFileSync('./dev/partials/panel-language.html').toString());
Handlebars.registerPartial('panel-share', fs.readFileSync('./dev/partials/panel-share.html').toString());
Handlebars.registerPartial('panel-share-transcript', fs.readFileSync('./dev/partials/panel-share-transcript.html').toString());

Handlebars.registerPartial('header', fs.readFileSync('./dev/partials/header.html').toString());
Handlebars.registerPartial('footer', fs.readFileSync('./dev/partials/footer.html').toString());

Handlebars.registerPartial('aside-left', fs.readFileSync('./dev/partials/aside-left.html').toString());
Handlebars.registerPartial('aside-right', fs.readFileSync('./dev/partials/aside-right.html').toString());

Handlebars.registerHelper('TITLE', function() {
  var longform = require('./src/data/' + L + '/muse/' + this.key + '.json');
  if (typeof longform.headline == 'undefined') return '';
  var headline = longform.headline;
  return new Handlebars.SafeString(
    headline
  );
});

Handlebars.registerHelper('AUTHOR', function() {
  var longform = require('./src/data/' + L + '/muse/' + this.key + '.json');
  if (typeof longform.headline == 'undefined') return '';
  var director = longform.director;
  var directorLabel = longform.directorLabel;
  return new Handlebars.SafeString(
    directorLabel + ': ' + director
  );
});

Handlebars.registerHelper('FOREWORD', function() {
  // var items = this.longforms[this.key].content;
  var longform = require('./src/data/' + L + '/muse/' + this.key + '.json');
  if (typeof longform.content == 'undefined') return '';
  var items = longform.content;
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
  Quiz: Handlebars.compile(fs.readFileSync('./dev/quiz.html').toString()),
  AJVideo: Handlebars.compile(fs.readFileSync('./dev/partials/video.html').toString()),
  AJQuote: Handlebars.compile(fs.readFileSync('./dev/partials/quote.html').toString()),
  Subheader: function (text) {return '<h2>' + text + '</h2>';},
  Foreword: function (text) {return '';}, //ignore foreword here
  'Body-text': function (text) {return text;}
};

Handlebars.registerHelper('CONTENT', function() {
  // var items = this.longforms[this.key].content;
  var longform = require('./src/data/' + L + '/muse/' + this.key + '.json');
  if (typeof longform.content == 'undefined') return '';
  var items = longform.content;
  var content = '';

  for (var i = 0; i < items.length; i++) {
    items[i].content.L = this.L;
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

