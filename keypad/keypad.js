var m = require('mraa'); //require mraa

var pin4 = initPin(4);
var pin8 = initPin(8);

function initPin(i){
	var myDigitalPin = new m.Gpio(i); //setup digital read on pin 6
	myDigitalPin.dir(m.DIR_IN); //set the gpio direction to input
	return myDigitalPin;
}

periodicActivity(); //call the periodicActivity function

function periodicActivity() //
{
	  var my4 =  pin4.read(); //read the digital value of the pin
	  var my8 =  pin8.read();
	  console.log(my4+' '+my8);
	 if(my4 == 1 && my8 == 1)
		console.log(1); //write the read value out to the console
	  setTimeout(periodicActivity,100); //call the indicated function after 1 second (1000 milliseconds)
}
