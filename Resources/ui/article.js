
var Mods = require('/modules');

var $$ = require(Mods.styles);

module.exports = function(article) {
	
	var article = new Object();
	
	article.title = 'Prueba título';
	article.text = ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis sem feugiat tortor dignissim lacinia eget vitae purus. Nunc augue urna, mollis nec mollis eu, rhoncus id lectus. Suspendisse dignissim enim condimentum sem lobortis lacinia. Curabitur ornare ante non turpis cursus vel consectetur ipsum commodo. Aenean venenatis lacus venenatis arcu aliquet pellentesque iaculis nisi vehicula. Duis massa elit, mattis et sollicitudin condimentum, sollicitudin eget leo. Ut vehicula ligula in risus convallis consectetur interdum risus sollicitudin. Integer fermentum orci nec felis posuere egestas.\n\nProin vitae odio risus. Morbi ullamcorper accumsan porta. Donec ut odio felis. Integer auctor est sit amet neque commodo euismod. Etiam sit amet lorem sapien, at convallis tellus.\n\nNunc cursus magna vel sapien varius eu ullamcorper ipsum condimentum. Nullam at erat ante. Duis vitae nulla vitae sem facilisis mollis.\n\nEtiam tincidunt massa vel tellus pulvinar a gravida metus tristique. Aliquam dolor metus, sagittis id volutpat nec, dictum non quam. Sed ante arcu, gravida nec mollis consequat, fermentum ac felis. Nunc consequat tristique libero nec dictum. Nullam nisi odio, euismod in vestibulum et, fermentum ac lorem. Fusce molestie cursus bibendum. Nunc in sodales nunc. Donec at rutrum nisl. Curabitur vitae velit vitae ipsum condimentum bibendum sed sit amet odio. Morbi pharetra, ipsum a scelerisque hendrerit, orci est porta arcu, sed vestibulum risus erat eget neque.\n\nMaecenas eget arcu orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse malesuada rutrum hendrerit. Duis adipiscing tristique magna sed tincidunt.';
	article.images = [
		{url:'http://www.broncesmestre.com/wp-content/thumbgen_cache/a80fd75ad756e67ba4b0b7d43a9409e9.jpg'},
		{url:'http://www.broncesmestre.com/wp-content/thumbgen_cache/331b1e07dfdfe48b125dde053191b405.gif'},
		{url:'http://www.broncesmestre.com/wp-content/thumbgen_cache/0932509a7687acaff339908fc2c57ff7.png'},
		{url:'http://www.broncesmestre.com/wp-content/thumbgen_cache/a80fd75ad756e67ba4b0b7d43a9409e9.jpg'},
		{url:'http://www.broncesmestre.com/wp-content/thumbgen_cache/331b1e07dfdfe48b125dde053191b405.gif'},
		{url:'http://www.broncesmestre.com/wp-content/thumbgen_cache/0932509a7687acaff339908fc2c57ff7.png'}
	];
	
	var view = Ti.UI.createScrollView({
		backgroundColor:'#FFF',
		left:Ti.Platform.displayCaps.platformWidth - 1,
		contentHeight:'auto',
		showVerticalScrollIndicator:true
	});
	
	setTimeout(function() {
		view.setShadow({
			shadowOffset:{x:-10,y:0},
			shadowRadius:4,
			shadowOpacity:0.4
		});
	}, 100);
	
	var title = Ti.UI.createLabel($$.articleTitle);
	title.text = article.title;
	
	var text = Ti.UI.createLabel($$.articleText);
	text.text = article.text;
	
	var images = Ti.UI.createScrollableView($$.articleImages);

	for (i in article.images) {
		var image = Ti.UI.createImageView({
			image:article.images[i].url,
			height:'122%',
			width:600
		});
		images.addView(image);
	}
	
	view.add(images);
	view.add(title);
	view.add(text);
	
	return view;
	
}
