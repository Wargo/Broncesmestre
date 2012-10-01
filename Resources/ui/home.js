
var Mods = require('/modules');

var $$ = require(Mods.styles);

module.exports = function() {
	
	var getData = require(Mods.bbdd);
	var data = getData();
	
	var win = Ti.UI.createWindow({
		backgroundColor:'#FFF'
	});
	
	var scrollView = Ti.UI.createScrollView({
		contentWidth:'auto',
		layout:'horizontal'
	});
	
	var MySection = require(Mods.homeSection);
	
	var broncesmestre = MySection(0);
	
	scrollView.add(broncesmestre);
	
	for (i in data.categories) {
		
		var section = MySection(data.categories[i]);
		
		scrollView.add(section);
		
	}
	
	win.add(scrollView);
	
	return win;
	
}
