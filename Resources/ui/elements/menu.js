
var Mods = require('/modules');

var $$ = require(Mods.styles);

module.exports = function(f_callback_back, f_callback_category, f_callback_config, f_callback_bronces) {
	
	var view = Ti.UI.createView({
		width:200,
		left:0,
		opacity:0,
		//backgroundColor:'#222',
		layout:'vertical'
	});
	
	var logo = Ti.UI.createImageView({
		image:'ui/images/logo_white.png',
		width:180
	});
	
	view.add(logo);
	
	var separatorTop = Ti.UI.createView($$.separatorTop);
	var separatorBottom = Ti.UI.createView($$.separatorBottom);
	
	var back = Ti.UI.createView($$.homeBtn);
	var text = Ti.UI.createLabel($$.textMenu);
	var icon = Ti.UI.createImageView({
		image:'ui/images/back.png',
		left:20,
		//width:50,
		//height:50
	});
	text.text = L('back');
	back.add(icon);
	back.add(text);
	back.add(separatorTop);
	back.add(separatorBottom);
	back.top = 30;
	back.bottom = 50;
	
	view.add(back);
	
	for (i in Ti.App.data) {
	
		var separatorTop = Ti.UI.createView($$.separatorTop);
		var separatorBottom = Ti.UI.createView($$.separatorBottom);
			
		var btn = Ti.UI.createView($$.homeBtn);
		var text = Ti.UI.createLabel($$.textMenu);
		text.text = Ti.App.data[i].name;
		btn._subcategories = Ti.App.data[i].subcategories;
		
		var icon = Ti.UI.createImageView({
			image:Ti.App.data[i].icon,
			left:10,
			width:50,
			height:50
		});
		
		btn.add(separatorTop);
		btn.add(icon);
		btn.add(text);
		btn.add(separatorBottom);
		view.add(btn);
		
		btn.addEventListener('click', function(e) {
			if (!e.source._subcategories) {
				e.source._subcategories = e.source.parent._subcategories;
			}
			f_callback_category(e.source._subcategories)
		});
		
	}
	
	back.addEventListener('click', function() {
		f_callback_back();
	});
	
	
	var separatorTop = Ti.UI.createView($$.separatorTop);
	var separatorBottom = Ti.UI.createView($$.separatorBottom);
	
	var icon = Ti.UI.createImageView({
		//image:'ui/images/tools.png',
		left:10,
	});
	var bronces = Ti.UI.createView($$.homeBtn);
	var text = Ti.UI.createLabel($$.textMenu);
	text.text = 'Broncesmestre';
	bronces.add(icon);
	bronces.add(text);
	bronces.add(separatorTop);
	bronces.add(separatorBottom);
	bronces.top = 220;
	view.add(bronces);
	
	bronces.addEventListener('click', function() {
		f_callback_bronces();
	});
	
	
	var separatorTop = Ti.UI.createView($$.separatorTop);
	var separatorBottom = Ti.UI.createView($$.separatorBottom);
	
	var icon = Ti.UI.createImageView({
		image:'ui/images/tools.png',
		left:10,
	});
	var config = Ti.UI.createView($$.homeBtn);
	var text = Ti.UI.createLabel($$.textMenu);
	text.text = L('config');
	config.add(icon);
	config.add(text);
	config.add(separatorTop);
	config.add(separatorBottom);
	view.add(config);
	
	config.addEventListener('click', function() {
		f_callback_config();
	});
	
	return view;
	
}
