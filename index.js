var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
// 2019
var socket = require('./socket');
var express = require('express');
var path = require('path');


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// app.use('/css', express.static(path.join(__dirname, "./css")));
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

// 2019

// var server = socket.initialize(http);
// console.log(server)

http.listen(port, function(){
  console.log('listening on *:' + port);
});

let onlineCounter_ = 0;
let emitOnlineCounter = () => {
  let onlineCounter = socket.onlineCounter();
  if (onlineCounter_ !== onlineCounter) {
    console.log(`${ onlineCounter } users online`);
    io.emit('online-counter', onlineCounter);
    onlineCounter_ = onlineCounter;
  }
};

setInterval(emitOnlineCounter, 1000);


