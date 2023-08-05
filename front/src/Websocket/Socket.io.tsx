import { io, Socket } from 'socket.io-client';
import { API_URL } from '../Utils';

const socketUrl = '/socket/general';

let socket: Socket | null = null;

// export const initSocket = (userId: string) => {
//   socket = io("/socket", { query: { userId } });
// };

export const connectSocket = (userId: string) => {
  // if (!socket) {
    socket = io(socketUrl, {
      query: { userId },
      reconnection: true,
      reconnectionAttempts: 5,
    });
    
  // }
};

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket has not been initialized.');
  }
  return socket;
};


export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export default socket;
