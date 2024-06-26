import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("socket already running");
  } else {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Server is connected");

      socket.on("join-room", (roomId, userId) => {
        console.log(`a new user ${userId} joined room ${roomId}`);
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-connected", userId);
      });

      socket.on("user-toggle-audio", (userId, roomId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-toggle-audio", userId);
      });

      socket.on("user-toggle-video", (userId, roomId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-toggle-video", userId);
      });

      socket.on("user-leave", (userId, roomId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-leave", userId);
      });
    });
  }
  res.end();
};

export default SocketHandler;

// import { Server } from "socket.io";

// const SocketHandler = (req, res) => {
//   const io = res.socket.server.io;

//   if (io) {
//     console.log("Socket already running");
//   } else {
//     const server = res.socket.server;
//     const io = new Server(server, {
//       pingTimeout: 60000,
//       cors: {
//         // origin: "https://virtuo-chat.vercel.app/",
//         origin: "https://localhost:3000/",
//       },
//     });
//     server.io = io;

//     io.on("connection", (socket) => {
//       console.log("Server is connected");

//       socket.on("join-room", (roomId, userId) => {
//         console.log(`A new user ${userId} joined room ${roomId}`);
//         socket.join(roomId);
//         socket.broadcast.to(roomId).emit("user-connected", userId);
//       });

//       socket.on("user-toggle-audio", (userId, roomId) => {
//         socket.join(roomId);
//         socket.broadcast.to(roomId).emit("user-toggle-audio", userId);
//       });

//       socket.on("user-toggle-video", (userId, roomId) => {
//         socket.join(roomId);
//         socket.broadcast.to(roomId).emit("user-toggle-video", userId);
//       });

//       socket.on("user-leave", (userId, roomId) => {
//         socket.leave(roomId);
//         socket.broadcast.to(roomId).emit("user-leave", userId);
//       });
//     });
//   }
//   res.end();
// };

// export default SocketHandler;
