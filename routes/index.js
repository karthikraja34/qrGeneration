var express = require('express');
var router = express.Router();

var crypto = require('crypto');

var QRCode = require('qrcode');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

//tell express what to do when the /about route is requested
router.post('/form', function (req, res) {
  text = req.body.text;
  var val = hash(text);
  var qr = qrcod(val);
  console.log(qr)
  res.render('qr', {
    text: val,
    url: qr
  });

});


function sha(data) {
  var generator = crypto.createHash('sha256');
  generator.update(data)
  return generator.digest('hex')
}


// With promises


hash = (text) => {
  return sha(text);
};
var value;
qrcod = (val) => {
  QRCode.toDataURL(val, function (err, url) {
    value = url;
  })
  // console.log(value)
  return value;
};

module.exports = router;