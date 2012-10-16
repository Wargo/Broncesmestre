
var Mods = require('/modules');

var $$ = require(Mods.styles);

module.exports = function(category, f_callback) {
	
	if (!category) {
		var category = new Object;
		category.name = 'Broncesmestre';
		category.id = category.num = 0;
		category.image = '/ui/images/bronces.jpg';
	}
	
	var view = Ti.UI.createView({
		width:300,
		//borderColor:'#5333',
		//borderWidth:5,
		backgroundColor:'#FFF',
		left:10,
		bottom:10,
		top:10
	});
	
	var image = Ti.UI.createImageView({
		width:1200,
		height:'100%',
		left:-500,
		image:category.image
	});
	
	var titleView = Ti.UI.createView({
		height:70,
		backgroundColor:'#333',
		opacity:.8,
		bottom:0
	});
	
	var title = Ti.UI.createLabel($$.homeBlockText);
	title.text = category.name;
	
	var icon = Ti.UI.createImageView({
		image:category.icon,
		left:15,
	});
	
	view.add(image);
	view.add(titleView);
	titleView.add(title);
	titleView.add(icon);

	view._image = image;
	
	view.addEventListener('singletap', function(e) {
		f_callback(category.subcategories);
	});
	
	return view;
	
}
