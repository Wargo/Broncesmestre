
var Mods = require('/modules');

var $$ = require(Mods.styles);

module.exports = function() {
	
	var duration = 2000;
	
	var getData = require(Mods.bbdd);
	var data = getData();
	
	var win = Ti.UI.createWindow({
		backgroundColor:'#000'
	});
	
	var scrollView = Ti.UI.createScrollView({
		contentWidth:'auto',
		layout:'horizontal'
	});
	
	var MySection = require(Mods.homeSection);
	
	var broncesmestre = MySection(0, openCategory);
	scrollView.add(broncesmestre);
	
	var bgImages = [];
	bgImages.push(broncesmestre._image);
	
	for (i in data.categories) {
		
		var section = MySection(data.categories[i], openCategory);
		scrollView.add(section);
		
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
			left:0,
			opacity:0,
			backgroundColor:'#000'
		});
		
		var newWin = Ti.UI.createView({
			backgroundColor:'#FFF',
			left:Ti.Platform.displayCaps.platformWidth - 1
		});
		
		win.add(miniMenu);
		win.add(newWin);
		
		scrollView.animate({opacity:0, duration:duration});
		miniMenu.animate({opacity:1, duration:duration});
		newWin.animate({left:50, duration:duration});
		
	}
	
	return win;
	
}
