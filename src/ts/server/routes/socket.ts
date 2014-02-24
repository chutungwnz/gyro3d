/*
 * Serve content over a socket
 */
var _ = require('lodash');

var client = null;
var simulationId;

function send(socket, data, id) {
  if (socket !== null) {
    socket.emit(id, data);
  }
}

function simulate() {
  send(client, {x: Math.random() * Math.PI * 2, y: Math.random() * Math.PI * 2, z: Math.random() * Math.PI * 2}, 'data');
}

exports.send = function(data) {
  var params = data.split(" ");
  console.log("data " + data);
  if (params.length < 3) {
    console.log("bad data: " + data);
    return;
  }
  send(client, {x: params[1] / 180 * Math.PI, y: params[2] / -180 * Math.PI, z: params[0] / -180 * Math.PI }, 'data');
};

exports.init = function(io, serialPort) {
  io.sockets.on('connection', function (socket) {
    console.log("got client " + socket);
    client = socket;
  });
};

exports.startSimulation = function() {
  setInterval(function() {
    send(client, {x: Math.random() * Math.PI * 2, y: Math.random() * Math.PI * 2, z: Math.random() * Math.PI * 2}, 'data');
  }, 1000);
};

exports.startSimulation = function() {
  stopSimulation();
  simulationId = setInterval(simulate, 1000);
};

var stopSimulation = function() {
  clearInterval(simulationId);
};

exports.stopSimulation = stopSimulation;