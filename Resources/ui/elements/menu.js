
module.exports = function(viewsToClose) {
	
	var view = Ti.UI.createView({
		width:200,
		left:0,
		opacity:0,
		backgroundColor:'#000'
	});
	
	view.add(Ti.UI.createLabel({text:'Volver', color:'white', font:{fontSize:20}}));
	
	view.addEventListener('click', function() {
		scrollView.animate({opacity:1, duration:duration});
		
		for (i in viewsToClose) {
			if (viewsToClose[i]) {
				win.remove(viewsToClose[i]);
			}
		}
	});
	
	return view;
	
}
