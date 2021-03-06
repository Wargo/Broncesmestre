
var Mods = require('/modules');

var $$ = require(Mods.styles);

//var MyAmplify = require(Mods.amplify);

var MyGallery = require(Mods.gallery);

module.exports = function(article) {
	
	var article = new Object();
	
	article.model = 'Modelo 0A0168';
	article.title = 'Juego Manivelas con Placas con Cristal Swarovski';
	
	article.standard = [
		{ref:'0A0168.000.01', img:'http://www.broncesmestre.com/catalogo/acabados/pastilla_listado/01.PNG', imgBig:'http://www.broncesmestre.com/catalogo/articulos/imagen_icono/0A0168.000.01'},
		{ref:'0A0168.000.62', img:'http://www.broncesmestre.com/catalogo/acabados/pastilla_listado/62.PNG', imgBig:'http://www.broncesmestre.com/catalogo/articulos/imagen_icono/0A0168.000.62'}
	];
	
	article.variant = [
		{ref:'0A0168.85Y.01', img:'http://www.broncesmestre.com/catalogo/acabados/pastilla_listado/01.PNG', name:'Juego Manivelas con Cristal Swarovski y Bocallave Europeo 85mm', imgBig:'http://www.broncesmestre.com/catalogo/articulos/imagen_icono/0A0168.85Y.01'},
		{ref:'0A0168.85Y.62', img:'http://www.broncesmestre.com/catalogo/acabados/pastilla_listado/62.PNG', name:'Juego Manivelas con Cristal Swarovski y Bocallave Europeo 85mm'},
		{ref:'0A0168.90P.62', img:'http://www.broncesmestre.com/catalogo/acabados/pastilla_listado/62.PNG', name:'Juego Manivelas con Cristal Swarovski y Pomo Condena 90mm'},
		{ref:'0A0168.90Y.62', img:'http://www.broncesmestre.com/catalogo/acabados/pastilla_listado/62.PNG', name:'Juego Manivelas con Cristal Swarovski y Bocallave Europeo 90mm'}
	];
	
	article.image = 'http://www.broncesmestre.com/catalogo/articulos/imagen_icono/0A0168.000.01';
	
	article.images = [
		{url:'http://www.broncesmestre.com/catalogo/articulos/miniatura_ambiente/0A0168.000.62', big:'http://www.broncesmestre.com/catalogo/articulos/imagen_ambiente/0A0168.000.62'},
		{url:'http://www.broncesmestre.com/catalogo/articulos/miniatura_ambiente/0V0740.N00.01', big:'http://www.broncesmestre.com/catalogo/articulos/imagen_ambiente/0V0740.N00.01'},
		{url:'http://www.broncesmestre.com/catalogo/articulos/miniatura_ambiente/0R6541.N00.44', big:'http://www.broncesmestre.com/catalogo/articulos/imagen_ambiente/0R6541.N00.44'},
		{url:'http://www.broncesmestre.com/catalogo/articulos/miniatura_ambiente/0A1641.B00.01', big:'http://www.broncesmestre.com/catalogo/articulos/imagen_ambiente/0A1641.B00.01'},
		{url:'http://www.broncesmestre.com/catalogo/articulos/miniatura_ambiente/0R6469.000.50', big:'http://www.broncesmestre.com/catalogo/articulos/imagen_ambiente/0R6469.000.50'},
		{url:'http://www.broncesmestre.com/catalogo/articulos/miniatura_ambiente/0P6248.000.01', big:'http://www.broncesmestre.com/catalogo/articulos/imagen_ambiente/0P6248.000.01'}
	];
	
	var view = Ti.UI.createView({
		backgroundColor:'transparent',
		left:Ti.Platform.displayCaps.platformWidth - 1,
		width:754,
		backgroundImage:'ui/images/articleShadow.png'
	});
	
	var tableView = Ti.UI.createTableView({
		separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
		backgroundColor:'transparent'
	});
	var row = Ti.UI.createTableViewRow({
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	
	tableView.appendRow(row);
	/*
	view.addEventListener('postlayout', function() {
		if (!Ti.App._drawShadows) {
			return;
		}
		if (Ti.App.Properties.getBool('shadows', true)) {
			view.setShadow({
				shadowOffset:{x:0,y:0},
				shadowRadius:15,
				shadowOpacity:0.6
			});
		} else {
			view.borderColor = '#CCC';
			view.borderWidth = 1;
		}
	});
	*/
	var title = Ti.UI.createLabel($$.articleTitle);
	title.text = article.title;
	
	var model = Ti.UI.createLabel($$.articleModel);
	model.text = article.model;
	
	var loading = Ti.UI.createActivityIndicator({
		style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK
	});
	view.add(loading);
	loading.show();
	
	setTimeout(function() {
		fillData();
	}, 100);
	
	function fillData() {
		
		//var images = Ti.UI.createScrollableView($$.articleImages);
		
		var images = Ti.UI.createScrollView($$.articleImages);
		
		var imagesGallery = [];
		
		for (i in article.images) {
			var image = Ti.UI.createImageView({
				image:article.images[i].url,
				right:15,
				//_big:article.images[i].big,
				_i:i
			});
			
			imagesGallery.push(article.images[i].big);
			
			//images.addView(image);
			images.add(image);
			
			image.addEventListener('singletap', function(e) {
				//MyAmplify(e.source._big);
				MyGallery(imagesGallery, e.source._i);
			});
		}
		
		var mainImage = Ti.UI.createImageView({
			image:article.image,
			top:20,
			left:15,
			//width:170,
			//height:170
		});
		
		/*
		 * Referencias estandar
		 */
		var miniTableView1 = Ti.UI.createTableView({
			right:30,
			top:90,
			width:530,
			height:150,
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE
		});
		
		var tableHeader = Ti.UI.createTableViewRow({
			//backgroundColor:'#333',
			selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		var h = Ti.UI.createLabel($$.tableHeader)
		h.text = L('ref');
		h.left = 20;
		tableHeader.add(h);
		
		var h = Ti.UI.createLabel($$.tableHeader)
		h.text = L('finish');
		h.left = 240;
		tableHeader.add(h);
		
		var h = Ti.UI.createLabel($$.tableHeader)
		h.text = L('price');
		h.right = 20;
		tableHeader.add(h);
		
		miniTableView1.appendRow(tableHeader);
		
		for (i in article.standard) {
			
			var miniRow = Ti.UI.createTableViewRow({
				backgroundColor:'#EEE',
				selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
				height:40
			});
			
			miniRow.add(Ti.UI.createView({
				height:1,
				top:0,
				backgroundColor:'#8FFF'
			}));
			
			miniRow.add(Ti.UI.createView({
				height:1,
				bottom:0,
				backgroundColor:'#5BBB'
			}));
			
			var c = Ti.UI.createLabel($$.text)
			c.text = article.standard[i].ref;
			c.left = 20;
			miniRow.add(c);
			
			if (article.standard[i].imgBig) {
				c.color = '#6666CC';
				miniRow._imgBig = article.standard[i].imgBig;
				miniRow.addEventListener('click', function(e) {
					mainImage.image = e.row._imgBig;
				});
			}
			
			var c = Ti.UI.createImageView({
				image:article.standard[i].img
			});
			c.left = 240;
			miniRow.add(c);
			
			miniTableView1.appendRow(miniRow);
		}
		/*
		 * Fin referencias estandar
		 */
		
		/*
		 * Referencias variantes
		 */
		var miniTableView2 = Ti.UI.createTableView({
			left:30,
			right:30,
			top:260,
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE
		});
		
		var tableHeader = Ti.UI.createTableViewRow({
			//backgroundColor:'#333',
			selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
		});
		
		var h = Ti.UI.createLabel($$.tableHeader)
		h.text = L('ref');
		h.left = 20;
		tableHeader.add(h);
		
		var h = Ti.UI.createLabel($$.tableHeader)
		h.text = L('variant');
		h.left = 150;
		tableHeader.add(h);
		
		var h = Ti.UI.createLabel($$.tableHeader)
		h.text = L('finish');
		h.left = 510;
		tableHeader.add(h);
		
		var h = Ti.UI.createLabel($$.tableHeader)
		h.text = L('price');
		h.right = 20;
		tableHeader.add(h);
		
		miniTableView2.appendRow(tableHeader);
		
		for (i in article.variant) {
			var miniRow = Ti.UI.createTableViewRow({
				backgroundColor:'#EEE',
				selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
				height:50
			});
			
			miniRow.add(Ti.UI.createView({
				height:1,
				top:0,
				backgroundColor:'#8FFF'
			}));
			
			miniRow.add(Ti.UI.createView({
				height:1,
				bottom:0,
				backgroundColor:'#5BBB'
			}));
			
			var c = Ti.UI.createLabel($$.text)
			c.text = article.variant[i].ref;
			c.left = 20;
			miniRow.add(c);
			
			if (article.variant[i].imgBig) {
				c.color = '#6666CC';
				miniRow._imgBig = article.variant[i].imgBig;
				miniRow.addEventListener('click', function(e) {
					mainImage.image = e.row._imgBig;
				});
			}
			
			var c = Ti.UI.createLabel($$.text)
			c.text = article.variant[i].name;
			c.left = 150;
			c.width = 350;
			miniRow.add(c);
			
			var c = Ti.UI.createImageView({
				image:article.variant[i].img
			});
			c.left = 510;
			miniRow.add(c);
			
			miniTableView2.appendRow(miniRow);
		}
		/*
		 * Fin referencias variantes
		 */
		
		var moreView = Ti.UI.createView({
			backgroundColor:'transparent',
			height:200,
			width:250,
			top:-175,
			right:25,
			_show:false,
			zIndex:100
		});
		
		var moreButton = Ti.UI.createView({
			backgroundColor:'#262626',
			bottom:0,
			right:10,
			borderRadius:5,
			height:30,
			width:50
		});
		var moreButtonText = Ti.UI.createLabel({text:'+', color:'white'});
		moreButton.add(moreButtonText);
		
		var more = Ti.UI.createView({
			backgroundColor:'#262626',
			top:0,
			borderRadius:5,
			height:175,
			width:250
		});
		more.add(Ti.UI.createImageView({image:'ui/images/menuShare.png', top:5, left:5, right:5, bottom:5}));
		
		moreView.add(more);
		moreView.add(moreButton);
		
		moreButton.addEventListener('click', function() {
			if (moreView._show) {
				moreView._show = false;
				moreView.animate({top:-175});
				moreButtonText.text = '+';
			} else {
				moreView._show = true;
				moreView.animate({top:-5});
				moreButtonText.text = '-';
			}
		});
		
		row.add(moreView);
	
		row.add(mainImage);
		row.add(title);
		row.add(model);
		row.add(miniTableView1);
		row.add(miniTableView2);
		row.add(images);
		
		var width = 285;
		var move = true;
		var init = null;
		var left = null;
		
		var startTime = 0;
		var currentTime = 0;
		
		view.addEventListener('swipe', function(e) {
			if (e.direction == 'left') {
				var moveTo = -100;
			} else {
				var moveTo = 100;
			}
			if (move) {
				if (e.direction == 'right') {
					view.animate({left:1000, opacity:0}, function() {
						view.parent.remove(view);
					});
					view._parent.animate({left:385});
					view._parent._canMove = true;
					for (x in view._parent._rows) {
						view._parent._rows[x].backgroundColor = 'transparent';
					}
				} else {
					view.animate({left:width + moveTo}, function() {
						view.animate({left:width});
					});
				}
			} else {
				view.animate({left:width + moveTo}, function() {
					view.animate({left:width});
				});
			}
		});
		
		/*
		view.addEventListener('touchstart', function(e) {
			view._x = e.x;
			init = e.globalPoint.y;
			startTime = new Date().getTime();
			Ti.API.error('a')
		});
		
		view.addEventListener('touchmove', function(e) {
			Ti.API.error('b')
			currentTime = new Date().getTime();
			
			if (currentTime < startTime + 50) {
				return;
			}
			
			tableView.scrollable = false;
			Ti.App._drawShadows = false;
			
			if (Ti.UI.orientation === 3) {
				if (move) {
					left = e.globalPoint.y - view._x;
					if (left <= 300) {
						return;
					}
				} else {
					left = e.globalPoint.y - view._x - (e.globalPoint.y - init) / 2;
				}
				view.animate({left:left, duration:1});
			} else if (Ti.UI.orientation === 4) {
				if (move) {
					left = Ti.Platform.displayCaps.getPlatformWidth() - e.globalPoint.y - view._x;
					if (left <= 300) {
						return;
					}
				} else {
					left = Ti.Platform.displayCaps.getPlatformWidth() - e.globalPoint.y - view._x + (e.globalPoint.y - init) / 2;
				}
				view.animate({left:left, duration:1});
			}
			
		});
		
		view.addEventListener('touchend', function(e) {
			Ti.API.error('c')
			if (move) {
				if (left >= Ti.Platform.displayCaps.getPlatformWidth() - 300) {
					view.animate({opacity:0});
					view._parent.animate({left:400});
					view._parent._canMove = true;
					setTimeout(function() {
						view.parent.remove(view);
					}, 300);
					return;
				}
			}
			view.animate({left:width});
			tableView.scrollable = true;
			Ti.App._drawShadows = true;
		});
		*/
		
		view.add(tableView);
		
		loading.hide();
		
	}
		
	return view;
	
}
