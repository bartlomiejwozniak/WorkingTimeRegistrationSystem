var connect = null;
console.log('ups');
	$(document).ready(function () {
	console.log("streamClient ready!"); 
	var socket = io.connect('192.168.0.16:8080');	
	socket.on('news', function (data) {
		    console.log('news: '+data);
	});

	connect = new Connect('192.168.0.16',8080); 
	connect.initSocket(); });

function Connect(serverIP, serverPort) { this.socket = null; this.serverIP = serverIP; this.serverPort = serverPort; }

Connect.prototype.initSocket = function() { this.socket = io.connect('http://'+this.serverIP+":"+this.serverPort);

	this.socket.on('connect', function() { console.log("socket connected to http://"+connect.serverIP+":"+connect.serverPort); });

	this.socket.on('canvas', function(data) {
		try {
				
			var canvas = document.getElementById('videostream'); 
			var context = canvas.getContext('2d'); 
			var imageObj = new Image(); 
			imageObj.src = "data:image/jpeg;base64,"+data; 
			//console.log(imageObj);
			imageObj.onload = function(){ context.height = 180; context.width = 320; context.drawImage(imageObj,0,0,context.width,context.height); }
				} catch(e){ }
			});
	this.socket.on('disconnect', function(exception) {
				console.log("socket disconnect");
	});
};
