
var ImageFactory = require('ti.imagefactory');

var Mods = require('/modules');

var $$ = require(Mods.styles);

require('ti.viewshadow');

module.exports = function(subcategories, f_callback, width, move, win) {
	
	var view = Ti.UI.createView({
		//backgroundColor:'#FFF',
		backgroundColor:'transparent',
		left:Ti.Platform.displayCaps.platformWidth - 1,
		width:630,
		borderRadius:5,
		_itsMe:true,
		_canMove:true
	});
	
	var shadow = Ti.UI.createView({
		backgroundImage:'ui/images/bigShadow.png'
	});
	
	view.add(shadow);
	
	var loader = Ti.UI.createActivityIndicator({
		style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		message:L('loading')
	});
	
	view.add(loader);
	loader.show();
	/*
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
	*/
	
	var tableView = Ti.UI.createTableView({
		separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
		width:600,
		//backgroundColor:'#EEE',
		backgroundColor:'transparent',
		borderRadius:5
	});

/*
	if (subcategories.length <= 7) {
		tableView.height = 100 * subcategories.length;
	} else {
		tableView.bottom = 20;
	}
*/
	
	var rows = [];
	
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
			title.top = 15;
			title.height = 30;
			title.left = 110;
			title.right = 30;
			if (subcategories[i].num) {
				title.text = subcategories[i].name + ' (' + subcategories[i].num + ')';
			} else {
				title.text = subcategories[i].name;
			}
			
			var text = Ti.UI.createLabel($$.text);
			text.top = 40;
			text.height = 50;
			text.left = 110;
			text.right = 30;
			text.color = '#999';
			text.text = subcategories[i].text;
			
			var shadow = Ti.UI.createImageView({
				opacity:0,
				image:'ui/images/shadow.png',
				left:6,
				top:7
			});
			
			var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory + subcategories[i].md5 + '.jpg');
			
			if (Ti.App.Properties.getBool('forceImages', false)) {
				file.deleteFile();
			}
			
			if (file.exists()) {
				var image = Ti.UI.createImageView({
					left:10,
					opacity:0,
					image:file,
					borderRadius:10,
					_firstLoad:false,
					_shadow:shadow
				})
			} else {
				var image = Ti.UI.createImageView({
					left:10,
					opacity:0,
					image:subcategories[i].image,
					_firstLoad:true,
					_file:file,
					_shadow:shadow
				});
			}
			
			image.addEventListener('load', function(e) {
				if (e.source._firstLoad) {
					var thumb = newBlob = ImageFactory.imageTransform(e.source.toBlob(),
						{ type:ImageFactory.TRANSFORM_CROP, width:80, height:80 },
						{ type:ImageFactory.TRANSFORM_ROUNDEDCORNER, borderSize:0, cornerRadius:10 }
					);
					e.source.image = thumb;
					e.source._firstLoad = false;
					e.source._file.write(thumb);
				} else {
					e.source.animate({opacity:1});
					e.source._shadow.animate({opacity:1});
				}
			});
			
			var arrow = Ti.UI.createImageView({
				image:'ui/images/arrow.png',
				right:10,
				width:15
			});
			
			/*
			image.addEventListener('postlayout', function(e) {
				e.source.setShadow({
					shadowOffset:{x:5,y:5},
					shadowRadius:5,
					shadowOpacity:0.5
				});
			});
			*/
			
			var separatorTop = Ti.UI.createView($$.separatorTop);
			separatorTop.backgroundColor = '#8FFF';
			var separatorBottom = Ti.UI.createView($$.separatorBottom);
			separatorBottom.backgroundColor = '#5BBB';
			
			content.add(separatorTop);
			content.add(separatorBottom);
			content.add(shadow);
			content.add(title);
			content.add(text);
			content.add(image);
			content.add(arrow);
			
			row.add(content);
			
			tableView.appendRow(row);
			
			row._current = subcategories[i]
			
			rows.push(row);
			
		}
		
		view.add(tableView);
		loader.hide();
		
		view._rows = rows;
	
	}, 100);
	
	tableView.addEventListener('click', function(e) {
		if (f_callback) {
			for (x in rows) {
				rows[x].backgroundColor = 'transparent';
			}
			e.row.backgroundColor = '#CCC';
			f_callback(e.row._current);
		}
	});
	
	var init = null;
	var left = null;
	
	var startTime = 0;
	var currentTime = 0;
	
	view.addEventListener('swipe', function(e) {
		if (!view._canMove) {
			return;
		}
		if (e.direction == 'left') {
			var moveTo = -100;
		} else {
			var moveTo = 100;
		}
		if (move) {
			if (e.direction == 'right') {
				view.animate({left:1000, opacity:0}, function() {
					view.parent.remove(view);
					for (x in view._parent._rows) {
						view._parent._rows[x].backgroundColor = 'transparent';
					}
				});
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
	win.addEventListener('touchstart', function(e) {
		if (!view._canMove) {
			return;
		}
		view._x = e.x;
		init = e.globalPoint.y;
		startTime = new Date().getTime();
	});
	
	win.addEventListener('touchmove', function(e) {
		
		if (!view._canMove) {
			return;
		}
		
		currentTime = new Date().getTime();
		
		if (currentTime < startTime + 50) {
			return;
		}
		
		Ti.App._drawShadows = false;
		
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
	
	win.addEventListener('touchend', function(e) {
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
		Ti.App._drawShadows = true;
	});
	*/
	
	return view;
	
}
