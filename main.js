const net = require('net');
const server = net.createServer((socket)=>{
    socket.end("Goodbye");
}).listen(() => {  
    address = server.address();  
    console.log('opened server on %j', address);  
});