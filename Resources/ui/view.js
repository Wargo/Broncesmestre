
require('ti.viewshadow');

module.exports = function(subcategories, f_callback, width) {
	
	var view = Ti.UI.createView({
		backgroundColor:'#FFF',
		left:Ti.Platform.displayCaps.platformWidth - 1
	});
	
	setTimeout(function() {
		view.setShadow({
			shadowOffset:{x:-10,y:0},
			shadowRadius:4,
			shadowOpacity:0.4
		});
	}, 300);
	
	var tableView = Ti.UI.createTableView({
		top:20,
		left:20,
		right:20,
		bottom:20
	});
	
	for	(i in subcategories) {
		
		var row = Ti.UI.createTableViewRow({
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
		if (!init) {
			init = e.globalPoint.y;
		}
		if (Ti.UI.orientation === 3) {
			view.animate({left:e.globalPoint.y - view._x - (e.globalPoint.y - init) / 2, duration:1});
		} else if (Ti.UI.orientation === 4) {
			view.animate({left: Ti.Platform.displayCaps.getPlatformWidth() - e.globalPoint.y - view._x + (e.globalPoint.y - init) / 2, duration:1});
		}
	});
	
	view.addEventListener('touchend', function(e) {
		view.animate({left:width});
		init = null;
	});
	
	view.animate({left:width});
	
	return view;
	
}
