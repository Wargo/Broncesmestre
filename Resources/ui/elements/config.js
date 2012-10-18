
var Mods = require('/modules');

module.exports = function() {
	
	var view = Ti.UI.createWindow({
		backgroundColor:'white',
		modal:true,
		layout:'vertical'
	});
	
	var close = Ti.UI.createButton({
		title:L('close')
	});
	
	view.rightNavButton = close;
	
	close.addEventListener('click', function() {
		view.close();
	});
	
	var deleteData = Ti.UI.createButton({
		title:L('delete'),
		top:20
	});
	
	deleteData.addEventListener('click', function() {
		Ti.App.Properties.removeProperty('bbdd');
		Ti.UI.createAlertDialog({
			title:L('deletedTitle'),
			message:L('deletedText'),
			ok:L('ok')
		}).show();
	});
	
	var shadows = Ti.UI.createSwitch({
		value:Ti.App.Properties.getBool('shadows', true),
		top:20
	});
	
	shadows.addEventListener('change', function(e) {
		Ti.App.Properties.setBool('shadows', e.value);
	});
	
	var forceImages = Ti.UI.createSwitch({
		value:Ti.App.Properties.getBool('forceImages', false),
		top:20
	});
	
	forceImages.addEventListener('change', function(e) {
		Ti.App.Properties.setBool('forceImages', e.value);
	});
	
	var background = Ti.UI.createSwitch({
		value:Ti.App.win.backgroundColor == Ti.UI.iOS.COLOR_SCROLLVIEW_BACKGROUND ? 1 : 0,
		top:20
	});
	
	var styles = require(Mods.styles);
	
	background.addEventListener('change', function(e) {
		if (e.value == 1) {
			Ti.App.win.backgroundColor = Ti.UI.iOS.COLOR_SCROLLVIEW_BACKGROUND;
			styles.separatorTop.backgroundColor = '#5CCC';
			styles.separatorBottom.backgroundColor = '#5333';
		} else {
			Ti.App.win.backgroundColor = Ti.UI.iOS.COLOR_VIEW_FLIPSIDE_BACKGROUND;
			styles.separatorTop.backgroundColor = '#8444';
			styles.separatorBottom.backgroundColor = '#9000';
		}
	});
	
	view.add(Ti.UI.createLabel({text:'sombras', top:30}));
	view.add(shadows);
	view.add(Ti.UI.createLabel({text:'Recargar imágenes', top:30}));
	view.add(forceImages);
	view.add(Ti.UI.createLabel({text:'Fondo: Oscuro / Claro', top:30}));
	view.add(background);
	view.add(deleteData);
	
	return view;
	
}
