// Using Node.js Native http library - 



import WebSocket, {WebSocketServer} from 'ws';
import http from 'http';

const server = http.createServer(function(request: any, response: any) {
    console.log((new Date().toISOString()) + ' Received request for ' + request.url);
    response.end("Hi there!");
});

const wss = new WebSocketServer({server});

let count = 0;

wss.on("connection", function(socket) {
    socket.on("error", (err) => console.error(err));
    socket.on("message", function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if(client.readyState === WebSocket.OPEN) {
                client.send(data, {binary: isBinary});
            }
        });
    });

    console.log("user connected", ++count);
    socket.send("Hello! Message from server!");
});

server.listen(8080, function() {
    console.log((new Date().toISOString()) + " Server is listening on port 8080");
});







// Expression.js - 



// import express from "express";
// import WebSocket, { WebSocketServer } from "ws";

// const app = express();
// const httpServer = app.listen(8080);

// const wss = new WebSocketServer({server: httpServer});

// let count = 0;

// wss.on("connection", function connection(socket) {
//     socket.on("error", (err) => console.error(err));

//     socket.on("message", function message(data, isBinary) {
//         wss.clients.forEach(function each(client) {
//             if(client.readyState === WebSocket.OPEN) {
//                 client.send(data, {binary: isBinary});
//             }
//         });
//     });

//     console.log("User connected", ++count);
//     socket.send("Hello! Message from Server!");

// });
