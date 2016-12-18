var config = require('../config');
var unirest = require('unirest');
var fs = require('fs');
exports.recognize = function (req, res, file_path, callback) {
	var file = fs.createReadStream(file_path);
	unirest.post(config.api_recognize_address)
		.header("X-Mashape-Key", "QxVWJx6JfemshZnzSXeq518ClRiOp1qs7wijsnBTuRecE7KSKe")
		.field("album", config.api_album_name)
		.field("albumkey", config.api_album_key)
		.attach("files", file)
		.end(function (result) {
			console.log(result.body.photos[0]);
			//console.log(result.body.photos[0].tags[0]);
			callback(req, res, result.body.photos[0].tags[0].uids[0].prediction);
		});
}
