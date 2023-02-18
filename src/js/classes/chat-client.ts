import { io, Socket } from 'socket.io-client';

export class ChatClient {
    private readonly socket!: Socket;

    constructor(url: string, callback: Function) {
        try {
            this.socket = io(url);
            this.socket.on('cast-message', (message: string) => {
                callback(message);
            });
        } catch (e) {
            console.log(e);
        }
    }

    public sendMessage(message: string) {
        try {
            this.socket.emit('send-message', message);
        } catch (e) {
            console.log(e);
        }
    }
}
