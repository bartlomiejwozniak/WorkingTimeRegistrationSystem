var Lcd = require('../lcd/lcd');

exports.display = function (req, res) {
	Lcd.display(req.body.user_name);
	res.json('hahah');
}


