require('mraa');
var LCD = require('jsupm_i2clcd');

var myLcd = new LCD.Lcm1602(0);


//setInterval(displayRow(0, "HEJ"), 2000);

//while(true){
//	myLcd.scrollDisplayLeft();	

exports.display = function(row, text){
	displayRow(row, text);
};

function displayRow(row, text) {
	clearRow(row);
	writeText(row, text);

}

function writeText(row, text){
	myLcd.setCursor(row, 0);
	myLcd.write(text);
}

function clearRow(row) {
	writeText(row, '                ');
}

