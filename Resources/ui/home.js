
var Mods = require('/modules');

var $$ = require(Mods.styles);

module.exports = function() {
	
	Ti.App._drawShadows = true;
	
	var loading = Ti.UI.createActivityIndicator({
		message:L('loading'),
		color:'white'
	});
	
	var getData = require(Mods.bbdd);
	getData(setData);
	
	var win = Ti.UI.createWindow({
		//backgroundColor:'#FFF'
		backgroundColor:Ti.UI.iOS.COLOR_VIEW_FLIPSIDE_BACKGROUND, // OSCURO
		//backgroundColor:Ti.UI.iOS.COLOR_GROUP_TABLEVIEW_BACKGROUND, // NEGRO
		//backgroundColor:Ti.UI.iOS.COLOR_SCROLLVIEW_BACKGROUND, // CLARO
		//backgroundColor:Ti.UI.iOS.COLOR_UNDER_PAGE_BACKGROUND, // MUY CLARO
		//opacity:0.5
	});
	
	Ti.App.win = win;
	
	var auxView = Ti.UI.createView({
		//backgroundColor:'#1FFF',
		opacity:0.9,
		backgroundColor:Ti.UI.iOS.COLOR_VIEW_FLIPSIDE_BACKGROUND
	});
	
	//win.add(auxView);
	
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
		
		var broncesmestre = MySection(0, openBronces);
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
	var broncesWin = null;
	
	var MyView = require(Mods.view);
	var MyMenu = require(Mods.menu);
	var MyArticle = require(Mods.article);
	var MyConfig = require(Mods.config);
	var MyBronces = require(Mods.bronces);
	
	function openCategory(subcategories) {
		
		if (!miniMenu) {
			miniMenu = MyMenu(goHome, openCategory, openConfig, openBronces);
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
		if (broncesWin) {
			win.remove(broncesWin);
		}
		
		//scrollView.animate({opacity:0});
		win.remove(scrollView);
		header.animate({opacity:0});
		logo.animate({opacity:0});
		
		newWin = MyView(subcategories, openSubcategory, 200, false, win);
		win.add(newWin);
		newWin.animate({left:200});
		
	}
	
	function goHome() {
		if (otherWin) {
			win.remove(otherWin);
		}
		
		if (articleWin) {
			win.remove(articleWin);
		}
		
		if (broncesWin) {
			win.remove(broncesWin);
		}
		win.add(scrollView);
		//scrollView.animate({opacity:1});
		header.animate({opacity:0.7});
		logo.animate({opacity:1});

		win.remove(miniMenu);		
		win.remove(newWin);
		miniMenu = null;
	}
	
	function openSubcategory(subcategory) {
		var aux = [];
		
		subcategory.name = 'Modelo 120500 - Pomito de latón Modelo Sol';
		subcategory.text = '120500.000.01';
		subcategory.num = 0;
		
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
		
		otherWin = MyView(aux, openArticle, 400, true, win);
		
		otherWin._parent = newWin;
		
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
		otherWin.animate({left:70});
		
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
	
	function openBronces() {
		if (!miniMenu) {
			miniMenu = MyMenu(goHome, openCategory, openConfig, openBronces);
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
		if (broncesWin) {
			win.remove(broncesWin);
		}
		
		//scrollView.animate({opacity:0});
		win.remove(scrollView);
		header.animate({opacity:0});
		logo.animate({opacity:0});
		
		broncesWin = MyBronces();
		
		win.add(broncesWin);
		
		broncesWin.animate({left:200});
	}
	
	return win;
	
}
