var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var io = require('socket.io')(app.listen(8080));

var lcdController = require('./controllers/lcd');
var cameraController = require('./controllers/camera');
var lambdaController = require('./controllers/lambda');
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

var router = express.Router();
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

var camera= require('./camera/camera');
camera.stream(io);

console.log('a1');

router.route('/lcd')
	.post(lcdController.display);

router.route('/camera/take')
	.post(cameraController.take)
	.get(function(req,res){cameraController.stream(req, res, io)});

router.route('/camera/delete')
	.post(cameraController.delete);

router.route('/lambda/recognize')
	.post(lambdaController.recognize);

app.use('/api', router);
app.use('/views', express.static('views'));



//app.listen(8080);
