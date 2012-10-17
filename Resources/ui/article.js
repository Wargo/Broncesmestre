
var Mods = require('/modules');

var $$ = require(Mods.styles);

module.exports = function(article) {
	
	var article = new Object();
	
	article.title = 'Modelo 120500 - Pomito de latón Modelo Sol';
	article.text = '120500.000.01\r\r120500.000.21\r\r120500.000.45\r\r120500.000.50'
	article.images = [
		{url:'http://www.broncesmestre.com/catalogo/articulos/miniatura_ambiente/130513.000.95', big:'http://www.broncesmestre.com/catalogo/articulos/imagen_ambiente/130513.000.95'},
		{url:'http://www.broncesmestre.com/catalogo/articulos/miniatura_ambiente/120503.000.21', big:'http://www.broncesmestre.com/catalogo/articulos/imagen_ambiente/120503.000.21'},
		{url:'http://www.broncesmestre.com/catalogo/articulos/miniatura_ambiente/0Z5744.000.50', big:'http://www.broncesmestre.com/catalogo/articulos/imagen_ambiente/0Z5744.000.50'}
	];
	
	var view = Ti.UI.createView({
		backgroundColor:'#FFF',
		left:Ti.Platform.displayCaps.platformWidth - 1,
		width:724
	});
	
	var tableView = Ti.UI.createTableView({
		separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE
	});
	var row = Ti.UI.createTableViewRow({
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	
	tableView.appendRow(row);

	view.addEventListener('postlayout', function() {
		if (!Ti.App._drawShadows) {
			return;
		}
		if (Ti.App.Properties.getBool('shadows', true)) {
			view.setShadow({
				shadowOffset:{x:0,y:0},
				shadowRadius:15,
				shadowOpacity:0.6
			});
		} else {
			view.borderColor = '#CCC';
			view.borderWidth = 1;
		}
	});
	
	var title = Ti.UI.createLabel($$.articleTitle);
	title.text = article.title;
	
	var text = Ti.UI.createLabel($$.articleText);
	text.text = article.text;
	
	var images = Ti.UI.createScrollableView($$.articleImages);
	
	var MyAmplify = require(Mods.amplify);

	for (i in article.images) {
		var image = Ti.UI.createImageView({
			image:article.images[i].url,
			_big:article.images[i].big
		});
		images.addView(image);
		
		image.addEventListener('singletap', function(e) {
			MyAmplify(e.source._big);
		});
	}
	
	row.add(images);
	row.add(title);
	row.add(text);
	
	var width = 300;
	var move = true;
	var init = null;
	var left = null;
	
	var startTime = 0;
	var currentTime = 0;
	
	view.addEventListener('swipe', function(e) {
		if (e.direction == 'left') {
			var moveTo = -100;
		} else {
			var moveTo = 100;
		}
		if (move) {
			if (e.direction == 'right') {
				view.animate({left:1000, opacity:0}, function() {
					view.parent.remove(view);
				});
				view._parent.animate({left:400});
				view._parent._canMove = true;
			} else {
				view.animate({left:width + moveTo}, function() {
					view.animate({left:width});
				});
			}
		} else {
			view.animate({left:width + moveTo}, function() {
				view.animate({left:width});
			});
		}
	});
	
	/*
	view.addEventListener('touchstart', function(e) {
		view._x = e.x;
		init = e.globalPoint.y;
		startTime = new Date().getTime();
		Ti.API.error('a')
	});
	
	view.addEventListener('touchmove', function(e) {
		Ti.API.error('b')
		currentTime = new Date().getTime();
		
		if (currentTime < startTime + 50) {
			return;
		}
		
		tableView.scrollable = false;
		Ti.App._drawShadows = false;
		
		if (Ti.UI.orientation === 3) {
			if (move) {
				left = e.globalPoint.y - view._x;
				if (left <= 300) {
					return;
				}
			} else {
				left = e.globalPoint.y - view._x - (e.globalPoint.y - init) / 2;
			}
			view.animate({left:left, duration:1});
		} else if (Ti.UI.orientation === 4) {
			if (move) {
				left = Ti.Platform.displayCaps.getPlatformWidth() - e.globalPoint.y - view._x;
				if (left <= 300) {
					return;
				}
			} else {
				left = Ti.Platform.displayCaps.getPlatformWidth() - e.globalPoint.y - view._x + (e.globalPoint.y - init) / 2;
			}
			view.animate({left:left, duration:1});
		}
		
	});
	
	view.addEventListener('touchend', function(e) {
		Ti.API.error('c')
		if (move) {
			if (left >= Ti.Platform.displayCaps.getPlatformWidth() - 300) {
				view.animate({opacity:0});
				view._parent.animate({left:400});
				view._parent._canMove = true;
				setTimeout(function() {
					view.parent.remove(view);
				}, 300);
				return;
			}
		}
		view.animate({left:width});
		tableView.scrollable = true;
		Ti.App._drawShadows = true;
	});
	*/
	
	view.add(tableView);
	
	return view;
	
}
