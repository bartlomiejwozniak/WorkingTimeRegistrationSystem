var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//var io = require('socket.io')(app.listen(8081));

var lcdController = require('./controllers/lcd');
var cameraController = require('./controllers/camera');

app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));

var router = express.Router();

router.route('/lcd')
	.post(lcdController.display);

router.route('/camera/take')
	.post(cameraController.take); 

router.route('/camera/delete')
	.post(cameraController.delete);
    
app.use('/api', router);
app.listen(8081);
