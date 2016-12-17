function run_cmd(cmd, args, callBack ) {
	var spawn = require('child_process').spawn;
	var child = spawn(cmd, args);
	var resp = "";
}

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
	return '/project/camera/temp_files/';
}

exports.delete = function (fileName) {
	run_cmd("rm", ['-f', getFilePath()+fileName], function(text) {
		console.log(text);
	});
}

exports.take= function () {
	var fileName = getFileName();

	run_cmd( "/project/camera/ffmpeg-3.2-32bit-static/ffmpeg", ['-s', '1280x720', '-f', 'video4linux2', '-i', '/dev/video0', '-vframes', '2', getFilePath()+fileName], function(text) { console.log (text) });
	
	return fileName;
}
