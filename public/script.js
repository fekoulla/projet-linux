var socket = io.connect('http://172.16.12.154:8080/');

socket.on('connect', function(data) {
	socket.emit('join', 'user connected');
});

socket.on('unixVersion', function(data) {
	$("#unixVersion").html(data);
});

socket.on('serverInfo', function(data) {
	$("#serverInfo").html(data);
});