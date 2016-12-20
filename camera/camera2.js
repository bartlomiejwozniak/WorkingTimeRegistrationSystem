var ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath('/WorkingTimeRegistrationSystem/camera/ffmpeg-3.2-32bit-static/ffmpeg');

function getDateForName() {
	var date = new Date();
	return  ("00" + (date.getMonth() + 1)).slice(-2) + 
		("00" + date.getDate()).slice(-2) + 
		date.getFullYear()+ 
		("00" + date.getHours()).slice(-2) + 
		("00" + date.getMinutes()).slice(-2) + 
		("00" + date.getSeconds()).slice(-2);
}

function getFileName() {
	return 'temp_'+getDateForName()+'.jpeg';
}

function getFilePath(){
	return './WorkingTimeRegistrationSystem/camera/temp_files/';
}

exports.delete = function (fileName) {
	//	run_cmd("rm", ['-f', getFilePath()+fileName], function(text) {
	//	console.log(text);
	//});
}

exports.stream = function (req, res, io){
	var ffmpeg2 = require('child_process').spawn('/WorkingTimeRegistrationSystem/camera/ffmpeg-3.2-32bit-static/ffmpeg', [  "-i", "/dev/video0", "-f", "mjpeg", "udp://127.0.0.1:1234" ]);
	ffmpeg2.stderr.on('data', function (data) {
//		  console.log('stderr: ' + data.toString());
//	});
//	ffmpeg2.stdout.on('data', function (data) {
//		console.log(data);
		var frame = new Buffer(data).toString('base64');
		io.sockets.emit('canvas',frame);
	});
}
 
exports.take= function (req, res, callback) {
	var fileName = getFileName();
	var shot= ffmpeg('/dev/video0')
		.inputFormat('v4l2')
		.frames(1)
		.save('/WorkingTimeRegistrationSystem/camera/temp_files/'+fileName)
		.on('error', function(err, stdout, stderr) {
			callback(req, res, '');
		})
		.on('end', function() {
			callback(req, res, '/WorkingTimeRegistrationSystem/camera/temp_files/'+fileName);
		});
}

