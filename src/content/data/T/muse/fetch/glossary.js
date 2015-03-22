
var phantom = require('phantom');
var jf = require('jsonfile');

var site = "http://interactive.aljazeera.com/ajt/PalestineRemix/";
var pages = [
 "admin_detention",
 "borders",
 "bypass_road",
 "closure",
 "collective_punishment",
 "ethnic_cleansing",
 "green_line",
 "intifada",
 "occupied_territories",
 "palestinian_authority",
 "plo",
 "refugee",
 "settlement",
 "wall",
 "zionism"
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
		content: []
	};

	$('.Headline').each(function(i, e){
		var $e = $(e);
        $e.data('type', 'Headline');
		$e.data('content', $e.text().trim());
	});
    
	$('.Body-text').each(function(i, e){
		var $e = $(e);
		$e.data('type', 'Body-text');
		$e.data('content', $e.html().replace(/<!--(.*?)-->/gm, '').replace(/<p>&nbsp;<\/p>/g, '').trim());
	});

	var elements = $('.Body-text, .Headline');
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
        var top = $(e).offset().top;
        if (top < 200) return;
        if (top > 1000 && $(e).data('type') == "Headline") return;
        
		data.content.push({
			type: $(e).data('type'),
			content: $(e).data('content'),
            top: top
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
