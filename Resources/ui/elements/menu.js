
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
	
	var back = Ti.UI.createLabel({
		text:L('back'),
		color:'white',
		font:{fontSize:20},
		top:50
	});
	
	var btn1 = Ti.UI.createLabel($$.homeBtn);
	var btn2 = Ti.UI.createLabel($$.homeBtn);
	var btn3 = Ti.UI.createLabel($$.homeBtn);
	
	btn1.text = L('cat1');
	btn2.text = L('cat2');
	btn3.text = L('cat3');
	
	view.add(back);
	view.add(btn1);
	view.add(btn2);
	view.add(btn3);
	
	view.addEventListener('click', function() {
		f_callback();
	});
	
	return view;
	
}
