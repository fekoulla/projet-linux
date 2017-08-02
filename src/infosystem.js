var exec = require('exec');

function InfoSystem(socketClient){
	this.socketClient= socketClient;
};

InfoSystem.prototype.sendUnixVersion = function(){
	var client = this.socketClient;
	exec(['uname', '-a'], function(err, out, code) {
		if (err instanceof Error)
			throw err;
		client.emit("unixVersion", out);
	});
}

InfoSystem.prototype.sendServerInfo = function(){
	var client = this.socketClient;
	exec(['top', '-b', '-d1', '-n1'], function(err, out, code) {
		if (err instanceof Error)
			throw err;
		client.emit("serverInfo", out.replace("\n", "<br/>"));
	});
}

module.exports =  InfoSystem;