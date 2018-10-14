
var path = require('path');
var express = require('express');
// const http = require('http');
// const server = http.createServer();

var app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/batch', function(req, res){
  console.log("this ran successfully");
    res.sendFile(path.join(__dirname + '/dist/batch.html'))
})
app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});
