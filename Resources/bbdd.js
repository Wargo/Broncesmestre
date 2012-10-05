
module.exports = function(f_callback) {

	var path = 'http://www.broncesmestre.com/appMovil.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.info('success ' + this.responseText);
			var result = JSON.parse(this.responseText);
			if (result.status == 'ok') {
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
