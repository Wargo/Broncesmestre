
module.exports = function(images, pos) {
	
	var win = Ti.UI.createWindow({
		backgroundColor:'#000',
		opacity:0
	});
	
	var scrollableView = Ti.UI.createScrollableView({
		showPagingControl:true
	});
	
	win.addEventListener('singletap', function() {
		win.close({opacity:0});
	});
	
	for (i in images) {
		
		var scrollView = Ti.UI.createScrollView({
			maxZoomScale: 10,
		    minZoomScale: 1,
		    zoomScale: 1
		});
		
		var image = Ti.UI.createImageView({
			image:images[i],
			height:'100%',
			width:'100%'
		});

		scrollView.add(image);
		
		scrollableView.addView(scrollView);
		
	}
	
	scrollableView.currentPage = pos;
	
	win.add(scrollableView);
		
	win.open({opacity:1});
	
}
