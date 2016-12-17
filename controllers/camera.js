var Camera = require('../camera/camera');

exports.take = function (req, res) {
	var result = Camera.take(req.body);
	res.json(result);
}

exports.delete = function (req, res) { 
	var result = Camera.delete(req.body.filename);
	res.json(result);
}


