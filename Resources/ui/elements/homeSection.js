
module.exports = function(category) {
	
	if (!category) {
		var category = new Object;
		category.name = 'Broncesmestre';
		category.num = 0;
		category.image = 'http://broncesmestre.com/wp-content/themes/Bronces_Mestre/images/emes10.png';
	}
	
	var view = Ti.UI.createView({
		width:300,
		borderColor:'#333',
		borderWidth:5,
		backgroundImage:category.image
	});
	
	var titleView = Ti.UI.createView({
		height:50,
		backgroundColor:'#000',
		opacity:.5,
		bottom:0
	});
	
	var title = Ti.UI.createLabel({
		text:category.num ? (category.name + '\n\n' + category.num) : category.name,
		bottom:20,
		font:{fontSize:22},
		color:'#FFF'
	});
	
	view.add(titleView);
	view.add(title);
	
	return view;
	
}
