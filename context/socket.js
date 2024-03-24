import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  const { children } = props;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connection = io();
    setSocket(connection);
  }, []);

  socket?.on('connect_error',async (err)=>{
    console.log("Error establishing socket",err)
    await fetch('/api/socket')
  })

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const SocketContext = createContext(null);

// export const useSocket = () => {
//   const socket = useContext(SocketContext);
//   return socket;
// };

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const connection = io("https://localhost:3001", {
//       transports: ["websocket"], // Use websocket transport to avoid SSL protocol error
//     });

//     setSocket(connection);

//     connection.on('connect_error', async (err) => {
//       console.log("Error establishing socket", err);
//       try {
//         await fetch('/api/socket');
//       } catch (error) {
//         console.error("Failed to fetch /api/socket:", error);
//       }
//     });

//     return () => {
//       connection.disconnect(); // Cleanup on component unmount
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={socket}>
//       {children}
//     </SocketContext.Provider>
//   );
// };