import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './websocket.service';
import { extractAccessTokenFromCookie } from 'src/utils';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway()
export class SocketEvents {
  @WebSocketServer() server!: Server;

  constructor(
    private socketService: SocketService,
    private authService: AuthService,
  ) {}

  async handleConnection(client: Socket) {
    
    const access_token = extractAccessTokenFromCookie(client);
    if (!access_token) {
      client.disconnect();
      return;
    }
    const socketId = client.handshake.query.userId;
    const user = await this.authService.validateJwtToken(access_token);
    if (!user) {
      client.disconnect();
      return;
    }
    client.data = { id: user.id, email: user.email };
    console.log('Connecting client with socket id', user.id);
    // client.join(`user_${user.id}`);
    // this.server.emit(`user_status_update`, 'You are connected');
    // this.socketService.addUser(user.id, client);
    // this.server.to(`user_${user.id}`).emit('userStatus', { userId: user.id, status: true });
    // console.log(
    //   'connection nb connected:',
    //   this.socketService.getConnectedUsers().size,
    // );
  }

  handleDisconnect(client: Socket) {
    console.log('3 Connection out and client:', client.data);
    const userId = client.data.id;
    // const socketId = client.handshake.query.userId;
    // this.socketService.removeUser(userId);
    // console.log("dis map:", this.socketService.getConnectedUsers());
  }

  // @SubscribeMessage('message') // This decorator listens for messages with the event name 'message'
  // handleMessage(client: any, payload: any) {
  //   console.log(
  //     'Users connected:',
  //     // this.socketService.getConnectedUsers().size,
  //   );
  //   console.log('Received message:', payload);
  //   this.server.emit('test', 'Message received by server');
  // }
}
