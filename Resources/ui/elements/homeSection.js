
var Mods = require('/modules');

var $$ = require(Mods.styles);

module.exports = function(category, f_callback) {
	
	if (!category) {
		var category = new Object;
		category.name = 'Broncesmestre';
		category.id = category.num = 0;
		category.image = '/ui/images/logo.jpg';
	}
	
	var view = Ti.UI.createView({
		width:310,
		borderColor:'#333',
		borderWidth:5,
		backgroundColor:'#FFF'
	});
	
	var image = Ti.UI.createImageView({
		width:1200,
		height:'100%',
		left:-500,
		image:category.image
	});
	
	var titleView = Ti.UI.createView({
		height:50,
		backgroundColor:'#333',
		opacity:.8,
		bottom:0
	});
	
	var title = Ti.UI.createLabel($$.homeBlockText);
	title.text = category.num ? (category.name + ' (' + category.num + ')') : category.name;
	
	view.add(image);
	view.add(titleView);
	view.add(title);

	view._image = image;
	
	view.addEventListener('singletap', function(e) {
		f_callback(category.subcategories);
	});
	
	return view;
	
}
