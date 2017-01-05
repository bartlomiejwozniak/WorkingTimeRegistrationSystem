require('mraa');

var fingerprint_lib = require('jsupm_zfm20');
var myFingerprintSensor = new fingerprint_lib.ZFM20(0);
var Lcd = require('../lcd/lcd');

function findFingerPrint() {
    initFingerPrint();
    Lcd.display(0, 'Put your finger');
    Lcd.display(1, 'on sensor...');
    //myFingerprintSensor.deleteDB();
    var interval = setInterval(function() {
        if (myFingerprintSensor.generateImage() != fingerprint_lib.ZFM20.ERR_NO_FINGER) {
            clearInterval(interval);
            convertImage(1);
            var interval2 = setInterval(function() {
                Lcd.display(0, 'Leave your');
                Lcd.display(1, 'finger...');
                if (myFingerprintSensor.generateImage() == fingerprint_lib.ZFM20.ERR_NO_FINGER) {
                    clearInterval(interval2);
                    findFingerPrintInDb();
                }
            }, 500);
        }
    }, 500);
}

function initFingerPrint() {
    if (!myFingerprintSensor.setupTty(fingerprint_lib.int_B57600)) {
        console.log("Failed to setup tty port parameters");
        exit();
    }
}

function convertImage(i) {
    var rv = myFingerprintSensor.image2Tz(i);
    if (rv != fingerprint_lib.ZFM20.ERR_OK) {
        console.log("Image conversion failed with error code " + rv);
        exit();
    }
}

function findFingerPrintInDb() {
    var myid = new fingerprint_lib.uint16Array(0);
    myid.setitem(0, 0);
    var myscore = new fingerprint_lib.uint16Array(0);
    myscore.setitem(0, 0);
    var rv = myFingerprintSensor.search(1, myid, myscore)
    if (rv != fingerprint_lib.ZFM20.ERR_OK) {
        if (rv == fingerprint_lib.ZFM20.ERR_FP_NOTFOUND) {
            console.log("Finger Print not found");
            addNewFingerPrint();
        } else {
            console.log("Search failed with error code " + rv);
            exit();
        }
    } else {
        Lcd.display(0, "Fingerprint found!");
        Lcd.display(1, "ID: " + myid.getitem(0));
    }
}

function addNewFingerPrint() {
    var b = myFingerprintSensor.getNumTemplates() + 1;

    Lcd.display(0, 'Put same finger');
    Lcd.display(1, 'on sensor...');
    var interval = setInterval(function() {
        if (myFingerprintSensor.generateImage() != fingerprint_lib.ZFM20.ERR_NO_FINGER) {
            convertImage(2);
            createModel();
            storeModelInDb(b);
            clearInterval(interval);
        }
    }, 100);
}

function createModel() {
    var rv = myFingerprintSensor.createModel()
    if (rv != fingerprint_lib.ZFM20.ERR_OK) {
        if (rv == fingerprint_lib.ZFM20.ERR_FP_ENROLLMISMATCH)
            console.log("Fingerprints did not match.");
        else
            console.log("createModel failed with error code " + rv);
    }
}

function storeModelInDb(b){
	    rv = myFingerprintSensor.storeModel(1, b);
    if (rv != fingerprint_lib.ZFM20.ERR_OK) {
        console.log("storeModel failed with error code " + rv);
        exit();
    }
    Lcd.display(0, "Fingerprint");
    Lcd.display(1, "stored at id " + b);
}

function exit() {
    myFingerprintSensor = null;
    fingerprint_lib.cleanUp();
    fingerprint_lib = null;
    console.log("Exiting");
    //process.exit(0);
}

findFingerPrint();