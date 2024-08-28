const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const redis = require("redis");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Redis setup
const pubClient = redis.createClient();
const subClient = pubClient.duplicate();

// Subscribing to Redis Pub/Sub channels
subClient.subscribe("chat");

subClient.on("message", (channel, message) => {
  if (channel === "chat") {
    io.emit("chat message", message);
  }
});

// Handling socket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (msg) => {
    // Publish the message to the Redis channel
    pubClient.publish("chat", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Server listening on port 3001
server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
