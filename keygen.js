var keypair = require('keypair');
var fs = require('fs');

var pair = keypair();
fs.writeFile('./public.key', pair.public, function() {
	console.log('Wrote public key to ./public.key');
});
fs.writeFile('./private.key', pair.private, function() {
	console.log('Wrote private key to ./private.key');
});
