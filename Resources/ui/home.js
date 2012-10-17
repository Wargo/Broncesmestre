
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
		backgroundColor:Ti.UI.iOS.COLOR_VIEW_FLIPSIDE_BACKGROUND
	});
	
	win.add(loading);
	loading.show();
	
	var header = Ti.UI.createView({
		backgroundColor:'#000',
		opacity:0.7,
		top:0,
		zIndex:100,
		height:80
	});
	
	var logo = Ti.UI.createImageView({
		image:'ui/images/logo_white.png',
		zIndex:101,
		top:10
	});
	
	win.add(header);
	win.add(logo);
	
	var scrollView = Ti.UI.createScrollView({
		contentWidth:'auto',
		layout:'horizontal',
		backgroundColor:'transparent'
	});
	
	var MySection = require(Mods.homeSection);
	
	var bgImages = [];
	
	function setData(data) {

		Ti.App.data = data;

		for (i in data) {
			
			var section = MySection(data[i], openCategory);
			scrollView.add(section);
			
			bgImages.push(section._image);
			
		}
		
		var broncesmestre = MySection(0, openCategory);
		scrollView.add(broncesmestre);
		
		bgImages.push(broncesmestre._image);
		
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
	var configWin = null;
	
	var MyView = require(Mods.view);
	var MyMenu = require(Mods.menu);
	var MyArticle = require(Mods.article);
	var MyConfig = require(Mods.config);
	
	function openCategory(subcategories) {
		
		if (!miniMenu) {
			miniMenu = MyMenu(goHome, openCategory, openConfig);
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
		header.animate({opacity:0});
		logo.animate({opacity:0});
		
		newWin = MyView(subcategories, openSubcategory, 200, false);
		win.add(newWin);
		newWin.animate({left:200});
		
	}
	
	function goHome() {
		scrollView.animate({opacity:1});
		header.animate({opacity:0.7});
		logo.animate({opacity:1});

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
		
		articleWin._parent = otherWin;
		
		articleWin.animate({left:300});
		otherWin.animate({left:75});
		
		otherWin._canMove = false;
		
		win.add(articleWin);
		
	}
	
	function openConfig() {
		
		configWin = MyConfig();
		
		configWin.open({
			//modalStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE,
			//modalTransitionStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN
			modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET,
			modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE
		});
		 
	}
	
	return win;
	
}
