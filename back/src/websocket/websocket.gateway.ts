import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GetUser } from 'src/auth/decorator';
// import socket from '../../../front/src/Websocket/Socket.io.';

@WebSocketGateway()
export class SocketEvents {
  @WebSocketServer()
  server: Server;
  
  private connectedUsers: Set<string> = new Set();
  
  handleConnection(client: Socket) {
    console.log("client connected:", client.id);
    // Handle user connection
    // console.log("ok1");
    // const socketId = client.handshake.userId;
    // this.connectedUsers.add(socketId);
    // this.sendUserStatus(socketId, true);
  }
  
  handleDisconnect(client: Socket) {
    // Handle user disconnection
    console.log("oClient disconnected:", client.id);
    // const userId = client.handshake.query.userId;
    // this.connectedUsers.delete(userId);
    // this.sendUserStatus(userId, false);
  }

  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    this.server.emit('message', client.id, data);
  }
  
  private sendUserStatus(userId: string, status: boolean) {
    console.log("ok3");
    // Emit event to update user status in frontend
    this.server.to(userId).emit('userStatus', status);
  }
}