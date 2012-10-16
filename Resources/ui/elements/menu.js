
var Mods = require('/modules');

var $$ = require(Mods.styles);

module.exports = function(f_callback_back, f_callback_category, f_callback_config) {
	
	var view = Ti.UI.createView({
		width:200,
		left:0,
		opacity:0,
		//backgroundColor:'#222',
		layout:'vertical'
	});
	
	var back = Ti.UI.createView($$.homeBtn);
	var text = Ti.UI.createLabel($$.textMenu);
	text.text = L('back');
	back.add(text);
	back.top = 50;
	
	view.add(back);
	
	for (i in Ti.App.data) {
		
		var btn = Ti.UI.createView($$.homeBtn);
		var text = Ti.UI.createLabel($$.textMenu);
		text.text = Ti.App.data[i].name;
		btn._subcategories = Ti.App.data[i].subcategories;
		
		var icon = Ti.UI.createImageView({
			image:Ti.App.data[i].icon,
			left:10,
		});
		
		btn.add(icon);
		btn.add(text);
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
		
	var config = Ti.UI.createView($$.homeBtn);
	var text = Ti.UI.createLabel($$.textMenu);
	text.text = L('config');
	config.add(text);
	config.top = 50;
	view.add(config);
	
	config.addEventListener('click', function() {
		f_callback_config();
	});
	
	return view;
	
}
