
var Mods = require('/modules');

var $$ = require(Mods.styles);

module.exports = function() {
	
	var duration = 300;
	
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
	
	var otherWin = null;
	
	var MyView = require(Mods.view);
	var MyMenu = require(Mods.menu);
	
	function openCategory(subcategories) {
		
		var miniMenu = MyMenu([miniMenu, newWin, otherWin]);
		var newWin = MyView(subcategories, openSubcategory, 200);
		
		win.add(miniMenu);
		win.add(newWin);
		
		scrollView.animate({opacity:0, duration:duration});
		miniMenu.animate({opacity:1, duration:duration});
		
	}
	
	function openSubcategory(subcategory) {
		var aux = [];
		aux.push(subcategory);
		
		if (otherWin) {
			win.remove(otherWin);
		}
		
		otherWin = MyView(aux, null, 400);
		
		win.add(otherWin);
	}
	
	return win;
	
}
