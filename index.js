var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//var io = require('socket.io')(app.listen(8081));

var lcdController = require('./controllers/lcd');
var cameraController = require('./controllers/camera');
var lambdaController = require('./controllers/lambda');
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

var router = express.Router();

router.route('/lcd')
	.post(lcdController.display);

router.route('/camera/take')
	.post(cameraController.take); 

router.route('/camera/delete')
	.post(cameraController.delete);

router.route('/lambda/recognize')
	.post(lambdaController.recognize);

app.use('/api', router);
app.listen(8081);
