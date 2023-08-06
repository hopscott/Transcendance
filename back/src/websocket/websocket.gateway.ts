import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './websocket.service';
import { extractAccessTokenFromCookie } from 'src/utils';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({ namespace: 'general'})
export class SocketEvents {
  @WebSocketServer()
  server: Server;

  constructor(private socketService: SocketService, private authService: AuthService) {}

  afterInit(): void {
    console.log("Websocket Gateway initialized");
  }

  private connectedUsers: Map<number, Socket> = new Map();

  async handleConnection(client: Socket) {
    const access_token = extractAccessTokenFromCookie(client);
    if (!access_token) {
      client.disconnect();
      return;
    }
    const user = await this.authService.validateJwtToken(access_token);
    if (!user) {
      client.disconnect();
      return;
    }
    client.data = { id: user.id, email: user.email };
    client.join(`user_${user.id}`);
    this.server.emit(`user_status_update`, 'You are connected');

    this.connectedUsers.set(user.id, client);
    this.server.to(`user_${user.id}`).emit('userStatus', { userId: user.id, status: true });
    // await this.notifyFriendsOnline(user.id, true);


  }

  handleDisconnect(client: any) {
    console.log('3 Connection out');
    const socketId = client.handshake.query.userId;
    this.connectedUsers.delete(socketId);

    
  }

  @SubscribeMessage('message') // This decorator listens for messages with the event name 'message'
  handleMessage(client: any, payload: any) {
    console.log('Users connected:', this.connectedUsers);
    console.log('Received message:', payload);
    this.server.emit('test', 'Message received by server');
  }
}
