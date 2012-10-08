
var Mods = require('/modules');

var $$ = require(Mods.styles);

module.exports = function(article) {
	
	var article = new Object();
	
	article.title = 'Prueba título';
	article.text = ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis sem feugiat tortor dignissim lacinia eget vitae purus. Nunc augue urna, mollis nec mollis eu, rhoncus id lectus. Suspendisse dignissim enim condimentum sem lobortis lacinia. Curabitur ornare ante non turpis cursus vel consectetur ipsum commodo. Aenean venenatis lacus venenatis arcu aliquet pellentesque iaculis nisi vehicula. Duis massa elit, mattis et sollicitudin condimentum, sollicitudin eget leo. Ut vehicula ligula in risus convallis consectetur interdum risus sollicitudin. Integer fermentum orci nec felis posuere egestas.\n\nProin vitae odio risus. Morbi ullamcorper accumsan porta. Donec ut odio felis. Integer auctor est sit amet neque commodo euismod. Etiam sit amet lorem sapien, at convallis tellus.\n\nNunc cursus magna vel sapien varius eu ullamcorper ipsum condimentum. Nullam at erat ante. Duis vitae nulla vitae sem facilisis mollis.\n\nEtiam tincidunt massa vel tellus pulvinar a gravida metus tristique. Aliquam dolor metus, sagittis id volutpat nec, dictum non quam. Sed ante arcu, gravida nec mollis consequat, fermentum ac felis. Nunc consequat tristique libero nec dictum. Nullam nisi odio, euismod in vestibulum et, fermentum ac lorem. Fusce molestie cursus bibendum. Nunc in sodales nunc. Donec at rutrum nisl. Curabitur vitae velit vitae ipsum condimentum bibendum sed sit amet odio. Morbi pharetra, ipsum a scelerisque hendrerit, orci est porta arcu, sed vestibulum risus erat eget neque.\n\nMaecenas eget arcu orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse malesuada rutrum hendrerit. Duis adipiscing tristique magna sed tincidunt.';
	article.images = [
		{url:'http://www.broncesmestre.com/wp-content/thumbgen_cache/a80fd75ad756e67ba4b0b7d43a9409e9.jpg'},
		{url:'http://www.broncesmestre.com/wp-content/thumbgen_cache/331b1e07dfdfe48b125dde053191b405.gif'},
		{url:'http://www.broncesmestre.com/wp-content/thumbgen_cache/0932509a7687acaff339908fc2c57ff7.png'},
		{url:'http://www.broncesmestre.com/wp-content/thumbgen_cache/a80fd75ad756e67ba4b0b7d43a9409e9.jpg'},
		{url:'http://www.broncesmestre.com/wp-content/thumbgen_cache/331b1e07dfdfe48b125dde053191b405.gif'},
		{url:'http://www.broncesmestre.com/wp-content/thumbgen_cache/0932509a7687acaff339908fc2c57ff7.png'}
	];
	
	var view = Ti.UI.createScrollView({
		backgroundColor:'#FFF',
		left:Ti.Platform.displayCaps.platformWidth - 1,
		contentHeight:'auto',
		showVerticalScrollIndicator:true,
		width:724
	});

	setTimeout(function() {
		view.setShadow({
			shadowOffset:{x:0,y:0},
			shadowRadius:15,
			shadowOpacity:0.6
		});
	}, 100);
	
	var title = Ti.UI.createLabel($$.articleTitle);
	title.text = article.title;
	
	var text = Ti.UI.createLabel($$.articleText);
	text.text = article.text;
	
	var images = Ti.UI.createScrollableView($$.articleImages);

	for (i in article.images) {
		var image = Ti.UI.createImageView({
			image:article.images[i].url,
			height:'150%',
			width:724
		});
		images.addView(image);
	}
	
	view.add(images);
	view.add(title);
	view.add(text);
	
	var width = 300;
	var move = true;
	var init = null;
	var left = null;
	
	var startTime = 0;
	var currentTime = 0;
	
	view.addEventListener('touchstart', function(e) {
		view._x = e.x;
		init = e.globalPoint.y;
		startTime = new Date().getTime();
	});
	
	view.addEventListener('touchmove', function(e) {
		
		currentTime = new Date().getTime();
		
		if (currentTime < startTime + 100) {
			return;
		}
		
		//view.touchEnabled = false;
		
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
		if (move) {
			if (left >= Ti.Platform.displayCaps.getPlatformWidth() - 300) {
				view.animate({opacity:0});
				view._parent.animate({left:400});
				setTimeout(function() {
					view.parent.remove(view);
				}, 300);
				return;
			}
		}
		view.animate({left:width});
		//view.touchEnabled = true;
	});
	
	return view;
	
}
