
var Mods = require('/modules');

var $$ = require(Mods.styles);

require('ti.viewshadow');

module.exports = function(subcategories, f_callback, width, move) {
	
	var view = Ti.UI.createView({
		backgroundColor:'#FFF',
		left:Ti.Platform.displayCaps.platformWidth - 1,
		_itsMe:true
	});
	
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
		width:700
	});

	if (subcategories.length <= 7) {
		tableView.height = 100 * subcategories.length;
	} else {
		tableView.bottom = 20;
	}
	
	for	(i in subcategories) {
		
		var row = Ti.UI.createTableViewRow({
			selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
			height:100
		});
		
		var content = Ti.UI.createView({
			height:100
		});
		
		var title = Ti.UI.createLabel({
			height:30,
			left:100
		});
		title.text = subcategories[i].name;
		
		var image = Ti.UI.createImageView({
			left:20,
			image:subcategories[i].image,
			width:60,
			height:'100%'
		});
		
		content.add(title);
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
	
	var init = null;
	
	view.addEventListener('touchstart', function(e) {
		view._x = e.x;
		init = e.globalPoint.y;
	});
	
	view.addEventListener('touchmove', function(e) {
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
			if (Ti.UI.orientation === 3) {
				if (left >= 300) {
					view.animate({opacity:0});
					return;
				}
			} else {
				if (left >= 300) {
					view.animate({opacity:0});
					return;
				}
			}
		}
		view.animate({left:width});
		tableView.scrollable = true;
	});
	
	view.animate({left:width});
	
	return view;
	
}
