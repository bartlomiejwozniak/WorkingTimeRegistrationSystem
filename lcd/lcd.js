require('mraa');
var LCD = require('jsupm_i2clcd');

var myLcd = new LCD.Lcm1602(0);

myLcd.setCursor(0,0);
myLcd.write('Hello World'); 

myLcd.setCursor(0,1);
myLcd.write('Bartek');

