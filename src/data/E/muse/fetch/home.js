
var phantom = require('phantom');
var jf = require('jsonfile');

var site = "http://interactive.aljazeera.com/aje/PalestineRemix/";
var pages = [
	"index"
];

var process = function (key) {
	phantom.create(function (ph) {
	  ph.createPage(function (page) {
	    page.open(site + key + ".html", function (status) {
	      console.log("opened page? " + site + key + ".html " , status);
	      page.evaluate(extract, function (data) {
            // console.log(JSON.stringify(data));
            
            var elements = data.content;
            var content = [];
            var labels = ["A","B","C","D","E","F","G","H"];
            var l = 0
            var group = {
                type: labels[l]
            };
            content.push(group);
            l++;
            for (var i = 0; i < elements.length; i++) {
                // console.log()
                if (elements[i].type == "HeadlineNumber") {
                    group = {
                        type: labels[l]
                    };
                    content.push(group);
                    l++;
                }
                group[elements[i].type] = elements[i].content;
            }
            
            var data2 = {content: content};
            jf.writeFileSync("../" + key + ".json", data2);
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
        // headline: $('.Headline').first().text().trim(),
        // director: $('.Director-name').first().text().trim(),
        // directorLabel: $('.Director').first().text().trim(),	
		content: []
	};

	$('.Headline').each(function(i, e){
		var $e = $(e);
        var content = $e.text().trim();
        $e.data('content', content);
        if (parseInt(content) == content) {
            $e.data('type', 'HeadlineNumber');
        } else $e.data('type', 'Headline');
	});
    
	$('.Small-subheader').each(function(i, e){
		var $e = $(e);
		$e.data('type', 'Subheader');
		$e.data('content', $e.text().trim());
	});

	$('.Body-text').each(function(i, e){
		var $e = $(e);
		$e.data('type', 'Body-text');
		$e.data('content', $e.html().replace(/<!--(.*?)-->/gm, '').replace(/<p>&nbsp;<\/p>/g, '').trim());
	});

	var elements = $('.Small-subheader, .Body-text, .Headline');
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
