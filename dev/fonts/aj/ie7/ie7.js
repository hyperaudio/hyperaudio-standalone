/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referring to this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'aj\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-logo-aljazeera': '&#xe615;',
		'icon-users': '&#xe600;',
		'icon-comment': '&#xe601;',
		'icon-search': '&#xe602;',
		'icon-link': '&#xe603;',
		'icon-tools': '&#xe604;',
		'icon-audio': '&#xe605;',
		'icon-earth': '&#xe606;',
		'icon-share': '&#xe607;',
		'icon-plus': '&#xe608;',
		'icon-info': '&#xe609;',
		'icon-history': '&#xe60a;',
		'icon-menu': '&#xe60b;',
		'icon-text': '&#xe60c;',
		'icon-pictures': '&#xe60d;',
		'icon-video': '&#xe60e;',
		'icon-book': '&#xe60f;',
		'icon-arrow-up': '&#xe610;',
		'icon-scrollbar': '&#xe611;',
		'icon-twitter': '&#xe612;',
		'icon-facebook': '&#xe613;',
		'icon-gplus': '&#xe614;',
		'icon-add-to-list': '&#xe616;',
		'icon-s-arrow-left': '&#xe618;',
		'icon-s-arrow-right': '&#xe617;',
		'icon-m-arrow-left': '&#xe619;',
		'icon-m-arrow-right': '&#xe61a;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
