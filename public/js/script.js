$(function() {
	var socket = io.connect(window.location.origin, {query: 'token='+localStorage.getItem("serverToken")});

	socket.on('unixVersion', function(data) {
		$("#unixVersion").html(data);
	});

	socket.on('serverInfo', function(data) {
		$("#serverInfo").html(data);
	});

	socket.on('serverProcessus', function(data) {
		$("#serverProcessus").html(data);
	});
});