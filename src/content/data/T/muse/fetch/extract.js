
var phantom = require('phantom');
var jf = require('jsonfile');

var site = "http://interactive.aljazeera.com/ajt/PalestineRemix/";
var pages = [
	"against-the-wall",
	"al-nakba",
	"area-c",
	"beyond-the-walls",
	"forbidden-pilgrimage",
	"gaza-left-in-the-dark",
	"gaza-lives-on",
	"gaza-we-are-coming",
	"going-against-the-grain",
	"hunger-strike",
	"inside-shin-bet",
	"last-shepherds-of-the-valley",
	"lost-cities-of-palestine",
	"palestina-amore",
	"stronger-than-words",
	"the-pain-inside",
	"the-price-of-oslo"
];

var process = function (key) {
	phantom.create(function (ph) {
	  ph.createPage(function (page) {
	    page.open(site + key + ".html", function (status) {
	      console.log("opened page? " + site + key + ".html " , status);
	      page.evaluate(extract, function (data) {
	        // console.log(JSON.stringify(data));
	        jf.writeFileSync("../" + key + ".json", data);
	        ph.exit();
	      });
	    });
	  });
	});
};

for (var i = 0; i < pages.length; i++) {
	process(pages[i]);
}


var extract = function () {
	var data = {
		headline: $('.Headline').first().text().trim(),
		director: $('.Director-name').first().text().trim(),
		directorLabel: $('.Director').first().text().trim(),		
		content: []
	};

	$('.Subheader').each(function(i, e){
		var $e = $(e);
		$e.data('type', 'Subheader');
		$e.data('content', $e.text());
	});

	$('.Foreword').each(function(i, e){
		var $e = $(e);
		$e.data('type', 'Foreword');
		$e.data('content', $e.text());
	});

	$('.Body-text').each(function(i, e){
		var $e = $(e);
		$e.data('type', 'Body-text');
		$e.data('content', $e.html().replace(/<!--(.*?)-->/gm, '').replace(/<p>&nbsp;<\/p>/g, ''));
	});

	$('.AJVideo').each(function(i, e){
		var $e = $(e);
		var content = {
			vimeo: $e.data('video')
		};
		
		if ($e.data('showshare')) content.yt = $e.data('yt');
		if ($e.data('showlabel')) content.label = $e.data('label');
		
		$e.data('type', 'AJVideo');
		$e.data('content', content);
	});

	$('.AJQuote').each(function(i, e){
		var $e = $(e);
		var content = {
			quote: $e.find('.quote').text(),
			link: $e.data('link'),
			share: $e.data('share')
		};
		
		if ($e.hasClass('showLabel-true')) content.label = $e.find('.label').text();
		if ($e.hasClass('showContext-true')) content.context = $e.find('.context').text();
		
		$e.data('type', 'AJQuote');
		$e.data('content', content);
	});

	var elements = $('.Subheader, .Foreword, .Body-text, .AJVideo, .AJQuote');
	elements.sort(function(a, b) {
		var a = $(a).offset();
		var b = $(b).offset();
		if (a.top < b.top)
	    	return -1;
		if (a.top > b.top)
	    	return 1;
		return 0;
	});

	elements.each(function(i, e){
		data.content.push({
			type: $(e).data('type'),
			content: $(e).data('content')
		});
	});

	// var $data = $('<textarea></textarea>').css({
	// 	position: 'absolute',
	// 	'z-index': 99999,
	// 	top: 0,
	// 	left: 0,
	// 	width: '100%',
	// 	height: '100%'
	// });
	// $('body').append($data);

	// $data.val(JSON.stringify(data, null, '\t'));
	return data;
};
