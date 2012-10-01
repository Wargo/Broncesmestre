
module.exports = function(category) {
	
	if (!category) {
		var category = new Object;
		category.title = 'Broncesmestre';
	}
	
	var view = Ti.UI.createView({
		width:250,
		borderColor:'#333',
		borderWidth:5
	});
	
	var titleView = Ti.UI.createView({
		height:50,
		backgroundColor:'#000',
		opacity:.5,
		bottom:0
	});
	
	var title = Ti.UI.createLabel({
		text:category.title
	});
	
	view.add(titleView);
	view.add(title);
	
	return view;
	
}
