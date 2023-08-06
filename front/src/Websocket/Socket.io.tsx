import { io, Socket } from 'socket.io-client';
import { APP_URL, SOCKET_GENERAL } from '../Utils';

// const socketUrl = '/api/general';
// const socketUrl = 'http://localhost:8000/';
const socketUrl = APP_URL + SOCKET_GENERAL;

let socket: Socket | null = null;

export const connectSocket = (userId: string | null, setFriendOnlineStatus: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>) => {

  console.log("inside socket and sock value:", socket);
  if (!userId)
    return;
  if (!socket) {
    console.log('Connecting socket for user:', userId);
    socket = io(socketUrl, {
      query: { userId },
      reconnection: true,
      reconnectionAttempts: 5,
    });

    socket.on("connect", () => {
      if (socket)
        console.log(socket.id);
    });
    // Listen on test
    socket.on('user_status_update', (data) => {
      console.log("Status update:", data);
    })

    socket.on('userStatus', ({ userId, status }: { userId: string; status: boolean }) => {
      setFriendOnlineStatus((prevStatus) => ({ ...prevStatus, [userId]: status }));
    });
    return socket;
  }
};

export const sendMessage = (message: string) => {
  if (socket) {
    socket.emit('message', message);
  }
};

export const getSocket = () => {
  if (!socket) {
    console.log("NOOOOOOOOOOOOOO SOCKET");
    return;
    // throw new Error('Socket has not been initialized.');
  }
  console.log("____SOCKET OK____")

  return socket;
};


export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export default socket;
