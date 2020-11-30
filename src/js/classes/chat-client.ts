import io from 'socket.io-client';

export class ChatClient {
    private readonly socket!: SocketIOClient.Socket;

    constructor(url: string, callback: Function) {
        try {
            this.socket = io.connect(url);
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
