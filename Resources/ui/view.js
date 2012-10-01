
module.exports = function(subcategories) {
	
	var view = Ti.UI.createView({
		backgroundColor:'#FFF',
		left:Ti.Platform.displayCaps.platformWidth - 1
	});
	
	var tableView = Ti.UI.createTableView({
		top:20,
		left:20,
		right:20,
		bottom:20
	});
	
	for	(i in subcategories) {
		
		var row = Ti.UI.createTableViewRow({
			height:100
		});
		
		var content = Ti.UI.createView();
		
		var title = Ti.UI.createLabel({
			left:100
		});
		title.text = subcategories[i].name;
		
		var image = Ti.UI.createImageView({
			left:20,
			image:subcategories[i].image,
			width:60,
			height:'100%'
		});
		
		content.add(title);
		content.add(image);
		
		row.add(content);
		
		tableView.appendRow(row);
		
	}
	
	return view;
	
}
