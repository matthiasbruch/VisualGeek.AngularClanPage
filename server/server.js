var express = require('express');
var app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.use(express.static('./'));

var port = 3000;

app.listen(port, function () {
  console.log('Clanpage started listening on port ' + port + '.');
})