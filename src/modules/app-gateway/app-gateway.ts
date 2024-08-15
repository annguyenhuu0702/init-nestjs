import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private loggerService: Logger) {}
  @WebSocketServer() server: Server;

  afterInit() {
    this.loggerService.log('WebSocket initialized');
  }

  handleConnection(client: Socket) {
    console.log('new user connected...', client.id);
    // notify all connected clients except the new one
    client.broadcast.emit('user-joined', {
      message: `new user joined the chat ${client.id}`,
    });
  }

  handleDisconnect(client: Socket) {
    console.log('user disconnected...', client.id);
    // notify all connected clients
    this.server.emit('user-left', {
      message: `user left the chat ${client.id}`,
    });
  }

  @SubscribeMessage('new-message')
  handleMessage(@MessageBody() message: string) {
    this.server.emit('message', message); //broadcast message to all clients
  }
}
