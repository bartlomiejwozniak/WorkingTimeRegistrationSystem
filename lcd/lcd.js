require('mraa');
var LCD = require('jsupm_i2clcd');

var myLcd = new LCD.Lcm1602(0);

exports.display = function (text){
	myLcd.setCursor(0,0);
	myLcd.write('Hello World'); 

	myLcd.setCursor(1,0);
	myLcd.write(text);
}

