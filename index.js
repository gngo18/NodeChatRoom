//First need to import the good good from the packages by using the require keyword

var express = require("express")
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http); //IO is how we are going to be communicating between clients

//You can think of io as being the server, passing data between two/more clients


//app.get(path, callback)
app.get("/",function(req, res){
	res.sendFile(__dirname + "/index.html");
});

//Use express to serve up static files(css, js, other htmls besides index) so our page can look dank sauce
app.use(express.static(__dirname+"/public"));

//We are going to handle the socket events here
io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});

//Tell the server where it should run on the host
http.listen(process.env.PORT || 3000, function(){
	console.log("listening on *:3000");	
});