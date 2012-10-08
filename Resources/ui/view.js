
var Mods = require('/modules');

var $$ = require(Mods.styles);

require('ti.viewshadow');

module.exports = function(subcategories, f_callback, width, move) {
	
	var view = Ti.UI.createView({
		backgroundColor:'#FFF',
		left:Ti.Platform.displayCaps.platformWidth - 1,
		_itsMe:true
	});
	
	var loader = Ti.UI.createActivityIndicator({
		style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		message:L('loading')
	});
	
	view.add(loader);
	loader.show();
	
	setTimeout(function() {
		view.setShadow({
			shadowOffset:{x:-10,y:0},
			shadowRadius:4,
			shadowOpacity:0.4
		});
	}, 150);
	
	var tableView = Ti.UI.createTableView({
		top:20,
		left:20,
		width:500
	});

	if (subcategories.length <= 7) {
		tableView.height = 100 * subcategories.length;
	} else {
		tableView.bottom = 20;
	}
	
	setTimeout(function() {
	
		for	(i in subcategories) {
			
			var row = Ti.UI.createTableViewRow({
				selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
				height:100
			});
			
			var content = Ti.UI.createView({
				height:100
			});
			
			var title = Ti.UI.createLabel($$.text);
			title.top = 10;
			title.height = 30;
			title.left = 100;
			title.text = subcategories[i].name;
			
			var text = Ti.UI.createLabel($$.text);
			text.top = 40;
			text.height = 50;
			text.left = 100;
			text.color = '#999';
			text.text = subcategories[i].text;
			
			var image = Ti.UI.createImageView({
				left:20,
				image:subcategories[i].image,
				width:60,
				height:'100%'
			});
			
			content.add(title);
			content.add(text);
			content.add(image);
			
			row.add(content);
			
			tableView.appendRow(row);
			
			row._current = subcategories[i]
			
			row.addEventListener('click', function(e) {
				if (f_callback) {
					f_callback(e.row._current);
				}
			});
			
		}
		
		view.add(tableView);
		loader.hide();
	
	}, 100);
	
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
		
		tableView.scrollable = false;
		
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
				return;
			}
		}
		view.animate({left:width});
		tableView.scrollable = true;
	});
	
	//view.animate({left:width});
	
	return view;
	
}
