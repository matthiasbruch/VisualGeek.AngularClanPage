var express = require('express');
var app = express();

app.use(express.static('./'));

app.get('/services/test', function (req, res) {
  res.send('{ success: true }');
});

var port = 3000;

app.listen(port, function () {
  console.log('Clanpage started listening on port ' + port + '.');
})