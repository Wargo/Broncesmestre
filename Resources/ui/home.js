
var Mods = require('/modules');

var $$ = require(Mods.styles);

module.exports = function() {
	
	var loading = Ti.UI.createActivityIndicator({
		message:L('loading'),
		color:'white'
	});
	
	var getData = require(Mods.bbdd);
	getData(setData);
	
	var win = Ti.UI.createWindow({
		backgroundColor:'#333'
	});
	
	win.add(loading);
	loading.show();
	
	var scrollView = Ti.UI.createScrollView({
		contentWidth:'auto',
		layout:'horizontal'
	});
	
	var MySection = require(Mods.homeSection);
	
	var broncesmestre = MySection(0, openCategory);
	scrollView.add(broncesmestre);
	
	var bgImages = [];
	bgImages.push(broncesmestre._image);
	
	function setData(data) {

		Ti.App.data = data;

		for (i in data) {
			
			var section = MySection(data[i], openCategory);
			scrollView.add(section);
			
			bgImages.push(section._image);
			
		}
		
		win.add(scrollView);
		
		//loading.hide();
	}
	
	scrollView.addEventListener('scroll', function(e) {
		for (i in bgImages) {
			bgImages[i].left = -500 + e.x / 5;
		}
	});
	
	var otherWin = null;
	var newWin = null;
	var miniMenu = null;
	
	var MyView = require(Mods.view);
	var MyMenu = require(Mods.menu);
	
	function openCategory(subcategories) {
		
		if (miniMenu) {
			win.remove(miniMenu);
		}
		if (newWin) {
			win.remove(newWin);
		}
		if (otherWin) {
			win.remove(otherWin);
		}
		
		newWin = MyView(subcategories, openSubcategory, 200, false);
		miniMenu = MyMenu(goHome, openCategory);
		
		win.add(miniMenu);
		win.add(newWin);
		
		newWin.animate({left:200});
		
		scrollView.animate({opacity:0});
		miniMenu.animate({opacity:1});
		
	}
	
	function goHome() {
		scrollView.animate({opacity:1});

		win.remove(miniMenu);		
		win.remove(newWin);
		if (otherWin) {
			win.remove(otherWin);
		}
	}
	
	function openSubcategory(subcategory) {
		var aux = [];
		
		aux.push(subcategory);
		
		if (otherWin) {
			win.remove(otherWin);
		}
		
		otherWin = MyView(aux, null, 400, true);
		
		otherWin.animate({left:400});
		
		win.add(otherWin);
	}
	
	return win;
	
}
