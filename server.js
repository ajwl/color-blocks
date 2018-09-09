
var path = require('path');
var express = require('express');
// const http = require('http');
// const server = http.createServer();

var app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/batch', function(req, res){
    res.send("helooooo")
})
app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});
