var socket = io.connect(window.location.origin);

socket.on('connect', function(data) {
	socket.emit('join', 'user connected');
});

socket.on('unixVersion', function(data) {
	$("#unixVersion").html(data);
});

socket.on('serverInfo', function(data) {
	$("#serverInfo").html(data);
});

socket.on('serverProcessus', function(data) {
	$("#serverProcessus").html(data);
});