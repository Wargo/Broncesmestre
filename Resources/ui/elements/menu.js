
var Mods = require('/modules');

var $$ = require(Mods.styles);

module.exports = function(f_callback) {
	
	var view = Ti.UI.createView({
		width:200,
		left:0,
		opacity:0,
		backgroundColor:'#000',
		layout:'vertical'
	});
	
	var back = Ti.UI.createLabel($$.homeBtn);
	back.text = L('back');
	back.top = 50;
	
	view.add(back);
	
	for (i in Ti.App.data.categories) {
		
		var btn = Ti.UI.createLabel($$.homeBtn);
	
		btn.text = Ti.App.data.categories[i].name;
		
		view.add(btn);
		
	}
	
	view.addEventListener('click', function() {
		f_callback();
	});
	
	return view;
	
}
