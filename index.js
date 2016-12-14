var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//var io = require('socket.io')(app.listen(8081));

var lcdController = require('./controllers/lcd');

app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));

var router = express.Router();

router.route('/lcd')
    .post(lcdController.display);

app.use('/api', router);
app.listen(8081);
