
module.exports = function(f_callback) {
	
	if (Ti.App.Properties.getString('bbdd')) {
		var result = JSON.parse(Ti.App.Properties.getString('bbdd'));
		Ti.API.info('cache ' + Ti.App.Properties.getString('bbdd'));
		setTimeout(function() {
			f_callback(result.data);
		}, 100);
		return;
	}

	var path = 'http://www.broncesmestre.com/appMovil.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.info('success ' + this.responseText);
			var result = JSON.parse(this.responseText);
			if (result.status == 'ok') {
				Ti.App.Properties.setString('bbdd', this.responseText);
				f_callback(result.data);
			}
		},
		onerror: function(e) {
			error = L('Ha ocurrido un error con la conexión');
			Ti.API.info('error');
		},
		timeout: 15000
	});
	
	client.open('GET', path);
	client.send();	
	
}
