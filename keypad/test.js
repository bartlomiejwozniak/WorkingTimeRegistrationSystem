var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
	  io: new Edison()
});

board.on("ready", function() {
	var keypad = new five.Keypad({
	  controller: "MPR121",
	  address: 0x5A
	});	  

	  ["press"].forEach(function(eventType) {
		      keypad.on(eventType, function(data) {
			            console.log("Event: %s, Target: %s", eventType, data.which);
				        });
		        });

});
