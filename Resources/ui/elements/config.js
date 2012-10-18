
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
	
	view.add(Ti.UI.createLabel({text:'sombras', top:30}));
	view.add(shadows);
	view.add(Ti.UI.createLabel({text:'Recargar imágenes', top:30}));
	view.add(forceImages);
	view.add(deleteData);
	
	return view;
	
}
