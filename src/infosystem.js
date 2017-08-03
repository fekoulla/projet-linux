var exec = require('exec');

function InfoSystem(socketClient){
	this.socketClient= socketClient;
};

InfoSystem.checkUserPassword= function(username, password, callback){
	exec([__dirname+'/../batch/checkpassword.bash', username, password], function(err, out, code) {
		if (err instanceof Error){
			console.log(err);
			throw err;
		}
		callback("ok");
	});
}

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
		
		var result = out.replace(new RegExp("\n", 'g'), "<br/>\n");
		var resultServerInfo= result.substr(0, result.indexOf( "<br/>\n<br/>\n"));
		var resultServerProcessus= result.substr(result.indexOf( "<br/>\n<br/>\n")+14, result.length);
		resultServerProcessus= "<span class='col-xs-1'>"
								+resultServerProcessus.replace(new RegExp(" ", 'g'), "</span><span class='col-xs-1'>")
													  .replace(new RegExp("\n", 'g'), "</span>\n<span class='col-xs-1'>")
								+"</span>";
		resultServerProcessus= resultServerProcessus.replace(new RegExp("<span class='col-xs-1'></span>", 'g'), "");
		client.emit("serverInfo", resultServerInfo);
		client.emit("serverProcessus", resultServerProcessus);
	});
	var infoSys = this;
	setTimeout(function(){
		infoSys.sendServerInfo();
	},1000);
}

module.exports =  InfoSystem;