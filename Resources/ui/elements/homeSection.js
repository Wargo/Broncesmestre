
module.exports = function(category, f_callback) {
	
	if (!category) {
		var category = new Object;
		category.name = 'Broncesmestre';
		category.id = category.num = 0;
		category.image = 'http://broncesmestre.com/wp-content/themes/Bronces_Mestre/images/emes10.png';
	}
	
	var view = Ti.UI.createView({
		width:310,
		borderColor:'#333',
		borderWidth:5,
		backgroundColor:'#FFF'
	});
	
	var image = Ti.UI.createImageView({
		width:510,
		height:'100%',
		left:-100,
		image:category.image
	});
	
	var titleView = Ti.UI.createView({
		height:50,
		backgroundColor:'#000',
		opacity:.5,
		bottom:0
	});
	
	var title = Ti.UI.createLabel({
		text:category.num ? (category.name + ' (' + category.num + ')') : category.name,
		bottom:20,
		font:{fontSize:22},
		color:'#FFF'
	});
	
	view.add(image);
	view.add(titleView);
	view.add(title);
	
	view._image = image;
	view._subcategories = category.subcategories;
	
	view.addEventListener('singletap', function(e) {
		
		f_callback(e._subcategories);
		
	});
	
	return view;
	
}
