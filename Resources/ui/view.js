
var Mods = require('/modules');

var $$ = require(Mods.styles);

require('ti.viewshadow');

module.exports = function(subcategories, f_callback, width, move) {
	
	var view = Ti.UI.createView({
		backgroundColor:'#FFF',
		left:Ti.Platform.displayCaps.platformWidth - 1,
		width:600,
		borderRadius:5,
		_itsMe:true,
		_canMove:true
	});
	
	var loader = Ti.UI.createActivityIndicator({
		style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		message:L('loading')
	});
	
	view.add(loader);
	loader.show();
	
	view.addEventListener('postlayout', function() {
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
	
	var tableView = Ti.UI.createTableView({
		top:20,
		left:20,
		width:560
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
			if (subcategories[i].num) {
				title.text = subcategories[i].name + ' (' + subcategories[i].num + ')';
			} else {
				title.text = subcategories[i].name;
			}
			
			var text = Ti.UI.createLabel($$.text);
			text.top = 40;
			text.height = 50;
			text.left = 100;
			text.color = '#999';
			text.text = subcategories[i].text;
			
			var image = Ti.UI.createImageView({
				left:0,
				image:subcategories[i].image,
				width:80,
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
		if (!view._canMove) {
			return;
		}
		view._x = e.x;
		init = e.globalPoint.y;
		startTime = new Date().getTime();
	});
	
	view.addEventListener('touchmove', function(e) {
		
		if (!view._canMove) {
			return;
		}
		
		currentTime = new Date().getTime();
		
		if (currentTime < startTime + 50) {
			return;
		}
		
		tableView.scrollable = false;
		
		if (Ti.UI.orientation === 3) {
			if (move) {
				left = e.globalPoint.y - view._x;
			} else {
				left = e.globalPoint.y - view._x - (e.globalPoint.y - init) / 2;
			}
		} else if (Ti.UI.orientation === 4) {
			if (move) {
				left = Ti.Platform.displayCaps.getPlatformWidth() - e.globalPoint.y - view._x;
			} else {
				left = Ti.Platform.displayCaps.getPlatformWidth() - e.globalPoint.y - view._x + (e.globalPoint.y - init) / 2;
			}
		}
		if (move && left <= 300) {
			return;
		}
		view.animate({left:left, duration:1});
		
	});
	
	view.addEventListener('touchend', function(e) {
		if (!view._canMove) {
			return;
		}
		
		if (move) {
			if (left >= Ti.Platform.displayCaps.getPlatformWidth() - 300) {
				view.animate({opacity:0});
				setTimeout(function() {
					view.parent.remove(view);
				}, 300);
				return;
			}
		}
		view.animate({left:width});
		tableView.scrollable = true;
	});
	
	return view;
	
}
