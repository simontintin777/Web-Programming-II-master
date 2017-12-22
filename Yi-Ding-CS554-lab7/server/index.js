var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//const bodyParser = require("body-parser");
const redisConnection = require("./redis-connection");
const nrpSender = require("./nrp-sender-shim");


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('searchDetails', async function(msg, res){
      try {
        //console.log(msg)
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "searchImage",
            data: {
                message: msg[2]
            }
        });
        //console.log(response.message);
        let message1 = {
          url: response.message,
          username: msg[0],
          message: msg[1]
        }
        io.emit("URL", message1);
        //res.json(response);
    } catch (e) {
        res.json({ error: e.message });
    }
    });
});
        
http.listen(3000, function(){
  console.log('listening on *:3000');
});