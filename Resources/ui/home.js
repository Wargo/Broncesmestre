
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
		
		loading.hide();
	}
	
	scrollView.addEventListener('scroll', function(e) {
		for (i in bgImages) {
			bgImages[i].left = -500 + e.x / 5;
		}
	});
	
	var otherWin = null;
	var newWin = null;
	var miniMenu = null;
	var articleWin = null;
	
	var MyView = require(Mods.view);
	var MyMenu = require(Mods.menu);
	var MyArticle = require(Mods.article);
	
	function openCategory(subcategories) {
		
		if (!miniMenu) {
			miniMenu = MyMenu(goHome, openCategory);
			win.add(miniMenu);
			miniMenu.animate({opacity:1});
		}
		if (newWin) {
			win.remove(newWin);
		}
		if (otherWin) {
			win.remove(otherWin);
		}
		if (articleWin) {
			win.remove(articleWin);
		}
		
		scrollView.animate({opacity:0});
		
		newWin = MyView(subcategories, openSubcategory, 200, false);
		win.add(newWin);
		newWin.animate({left:200});
		
	}
	
	function goHome() {
		scrollView.animate({opacity:1});

		win.remove(miniMenu);		
		win.remove(newWin);
		miniMenu = null;
		
		if (otherWin) {
			win.remove(otherWin);
		}
		
		if (articleWin) {
			win.remove(articleWin);
		}
	}
	
	function openSubcategory(subcategory) {
		var aux = [];
		
		aux.push(subcategory);
		aux.push(subcategory);
		aux.push(subcategory);
		aux.push(subcategory);
		
		if (otherWin) {
			win.remove(otherWin);
		}
		
		if (articleWin) {
			win.remove(articleWin);
		}
		
		otherWin = MyView(aux, openArticle, 400, true);
		
		otherWin.animate({left:400});
		
		win.add(otherWin);
	}
	
	function openArticle(article) {
		
		if (articleWin) {
			win.remove(articleWin);
		}
	
		articleWin = MyArticle(article);
		
		articleWin.animate({left:600});
		
		win.add(articleWin);
		
	}
	
	return win;
	
}
