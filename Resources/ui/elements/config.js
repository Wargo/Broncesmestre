
module.exports = function() {
	
	var view = Ti.UI.createWindow({
		backgroundColor:'white',
		modal:true,
	});
	
	view.addEventListener('postlayout', function() {
		view.setShadow({
			shadowOffset:{x:0,y:0},
			shadowRadius:15,
			shadowOpacity:0.8
		});
	});
	
	var deleteData = Ti.UI.createButton({
		title:L('delete')
	});
	
	var close = Ti.UI.createButton({
		title:L('close'),
		right:5,
		top:5
	});
	
	view.add(deleteData);
	view.rightNavButton = close;
	
	deleteData.addEventListener('click', function() {
		Ti.App.Properties.removeProperty('bbdd');
		Ti.UI.createAlertDialog({
			title:L('deletedTitle'),
			message:L('deletedText'),
			ok:L('ok')
		}).show();
	});
	
	close.addEventListener('click', function() {
		view.close({opacity:0});
	});
	
	var shadows = Ti.UI.createSwitch({
		value:Ti.App.Properties.getBool('shadows', true),
		top:100
	});
	
	shadows.addEventListener('change', function(e) {
		Ti.App.Properties.setBool('shadows', e.value);
	});
	
	view.add(shadows);
	
	return view;
	
}
