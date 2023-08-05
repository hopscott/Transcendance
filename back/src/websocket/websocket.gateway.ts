import {
  // ConnectedSocket,
  // MessageBody,
  // SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// import { GetUser } from 'src/auth/decorator';
import { SocketService } from './websocket.service';
// import socket from '../../../front/src/Websocket/Socket.io.';

@WebSocketGateway({ namespace: 'general'})
export class SocketEvents {
  @WebSocketServer()
  server: Server;

  constructor(private socketService: SocketService) {}

  private connectedUsers: Set<string> = new Set();

  handleConnection(client: any) {
    // Handle user connection
    console.log('ok1');
    const socketId = client.handshake.client.id;
    this.connectedUsers.add(socketId);
    this.sendUserStatus(socketId, true);
    // socketId.emit('hello', 'world');
  }

  handleDisconnect(client: any) {
    // Handle user disconnection
    console.log('ok2');
    const socketId = client.handshake.client.id;
    this.connectedUsers.delete(socketId);
    this.sendUserStatus(socketId, false);
  }

  private sendUserStatus(userId: string, status: boolean) {
    console.log('ok3');
    // Emit event to update user status in frontend
    this.server.to(userId).emit('userStatus', status);
  }
}
