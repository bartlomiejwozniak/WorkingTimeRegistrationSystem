var Camera = require('../camera/camera');

exports.take = function (req, res) {
	var result = Camera.take(req.body);
	res.json(result);
}

exports.stream = function (req, res, io) {
	//Camera.stream(req, res, io);
	res.render('index.html');
}

exports.delete = function (req, res) { 
	var result = Camera.delete(req.body.filename);
	res.json(result);
}


