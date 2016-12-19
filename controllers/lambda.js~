var Lambda = require('../lambda/lambda');
var Camera = require('../camera/camera');
var Lcd = require('../lcd/lcd');
exports.recognize = function (req, res) {
	Lcd.display(0, 'Prosze czekac');
	Lcd.display(1, 'Robie zdjecie...');	
	Camera.take(req, res, processCamera);
}

var processCamera = function(req, res, path) {
	Lcd.display(1, 'Przetwarzam zdjecie...');
	var result = Lambda.recognize(req, res, path, processLambda);
};

var processLambda = function(req, res, result) {
	Lcd.display(0, 'Dzien dobry!');
	Lcd.display(1, result+' :)');
	res.json(result);
}
