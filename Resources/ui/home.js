
var Mods = require('/modules');

var $$ = require(Mods.styles);

module.exports = function() {
	
	var getData = require(Mods.bbdd);
	var data = getData();
	
	var win = Ti.UI.createWindow({
		backgroundColor:'#FFF'
	});
	
	var scrollView = Ti.UI.createScrollView({
		contentWidth:'auto',
		layout:'horizontal'
	});
	
	var MySection = require(Mods.homeSection);
	
	var broncesmestre = MySection(0);
	
	scrollView.add(broncesmestre, openCategory);
	
	var bgImages = [];
	bgImages.push(broncesmestre._image);
	
	for (i in data.categories) {
		
		var section = MySection(data.categories[i]);
		
		scrollView.add(section, openCategory);
		
		bgImages.push(section._image);
		
	}
	
	win.add(scrollView);
	
	scrollView.addEventListener('scroll', function(e) {
		for (i in bgImages) {
			bgImages[i].left = -100 + e.x / 10;
		}
	});
	
	function openCategory(id) {
		
		var miniMenu = Ti.UI.createView({
			width:50,
			left:-50,
			backgroundColor:'#000'
		});
		
		win.add(miniMenu);
		
		miniMenu.animate({left:0, delay:500});
		
		scrollView.animate({left:-2000, opacity:0});
		
	}
	
	return win;
	
}
