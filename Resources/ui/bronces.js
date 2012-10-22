
var Mods = require('/modules');

var $$ = require(Mods.styles);

var MyGallery = require(Mods.gallery);

module.exports = function() {
	
	var view = Ti.UI.createScrollView({
		backgroundColor:'#FFF',
		left:Ti.Platform.displayCaps.platformWidth - 1,
		width:600,
		borderRadius:5,
		contentHeight:'auto',
		showVerticalScrollIndicator:true
	});
	
	var content = Ti.UI.createView({
		layout:'vertical'
	});
	
	var title = Ti.UI.createLabel($$.articleTitle);
	title.text = 'Compañía';
	title.left = title.right = title.top = 20;
	title.textAlign = 'center';
	
	var text = Ti.UI.createLabel($$.text);
	text.text = 'Bronces Mestre, S.A. Se funda en 1952,empezando su actividad como un pequeño taller artesanal dedicado a la fabricación de herrajes de gran calidad y diseño.\r\rEn 1.970, la empresa se traslada a su ubicación actual en el Polígono Industrial de Masía del Juez, ocupando un edificio de más de 14.000 metros cuadrados de superficie construida.\r\rA partir de este momento se inicia un proceso de modernización con la instalación de las líneas de producción más modernas de la época.\r\rLa calidad de nuestros productos es lo que ha marcado siempre la diferencia con los otros artículos presentes en el mercado. Latón 100% y cristal de Swarovski son los materiales que utilizamos. Nuestro equipo de diseño destaca por su originalidad para crear productos de alto valor añadido que perduran en el tiempo.\r\rLos estándares de calidad han sido la piedra angular en la historia de la empresa, combinando una producción moderna mediante el uso de maquinaria y tecnología de última generación con la labor manual de nuestros maestros artesanos.\r\rNuestras piezas destacan por la belleza y elegancia de sus formas, la artesanía en el forjado y cincelado de los productos y por la perfección de sus acabados famosos en todo el mundo.';
	text.top = 20;
	text.left = text.right = 20;
	
	content.add(title);
	content.add(text);
	
	var images = [
		{img:'http://www.broncesmestre.com/wp-content/uploads/2011/06/Mestre-1965-150x150.jpg', imgBig:'http://www.broncesmestre.com/wp-content/uploads/2011/06/Mestre-1965.jpg'},
		{img:'http://www.broncesmestre.com/wp-content/uploads/2011/06/Mestre-1970-150x150.jpg', imgBig:'http://www.broncesmestre.com/wp-content/uploads/2011/06/Mestre-1970.jpg'},
		{img:'http://www.broncesmestre.com/wp-content/uploads/2011/06/Mestre-2000-150x150.jpg', imgBig:'http://www.broncesmestre.com/wp-content/uploads/2011/06/Mestre-2000.jpg'},
		{img:'http://www.broncesmestre.com/wp-content/uploads/2011/06/Mestre-2011-150x150.jpg', imgBig:'http://www.broncesmestre.com/wp-content/uploads/2011/06/Mestre-2011.jpg'}
	];
	
	var imageView = Ti.UI.createScrollView({
		contentWidth:'auto',
		showHorizontalScrollIndicator:true,
		top:20,
		left:20,
		right:20,
		height:150,
		layout:'horizontal'
	});
	
	content.add(imageView);
	
	var arrayImages = [];
	
	for (i in images) {
		var image = Ti.UI.createImageView({
			image:images[i].img,
			left:10,
			_i:i
		});
		
		imageView.add(image);
		
		arrayImages.push(images[i].imgBig);
		
		image.addEventListener('click', function(e) {
			MyGallery(arrayImages, e.source._i)
		});
	}
	
	var tableView = Ti.UI.createTableView({
		separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE
	});
	var row = Ti.UI.createTableViewRow({
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	
	row.add(content);
	
	tableView.appendRow(row);
	
	view.add(tableView);
	
	view.addEventListener('swipe', function(e) {
		if (e.direction == 'left') {
			var moveTo = -100;
		} else {
			var moveTo = 100;
		}
		view.animate({left:200 + moveTo}, function() {
			view.animate({left:200});
		});
	});
	
	return view;
	
}
