import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class SocketService {
  // private connectedUsers: Map<string, Socket> = new Map();
  // private connectedUsers: Map<number, Socket> = new Map();


  // getConnectedUsers(): Map<number, Socket> {
  //   return this.connectedUsers;
  // }

  // getNbConnectedUsers(): Map<number, Socket> {
  //   return this.connectedUsers;
  // }

  // addUser(userId: number, socket: Socket): void {
  //   this.connectedUsers.set(userId, socket);
  // }

  // removeUser(userId: number): void {
  //   this.connectedUsers.delete(userId);
  // }

  // getSocket(userId: number): Socket | undefined {
  //   return this.connectedUsers.get(userId);
  // }

  // getAllSockets(): Socket[] {
  //   return Array.from(this.connectedUsers.values());
  // }

  // closeAllSockets() {
  //   for (const socket of this.connectedUsers.values()) {
  //     socket.disconnect();
  //   }
  //   this.connectedUsers.clear();
  // }
}
