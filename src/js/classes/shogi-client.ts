import io from "socket.io-client";

export class ShogiClient {
    private readonly socket: SocketIOClient.Socket|any;

    constructor(url: string, callback: Function) {
        try {
            this.socket = io.connect(url);
            this.socket.on('cast-shogi', (data: any) => {
                callback(data);
            });
        } catch (e) {
            console.log(e);
        }
    }

    public send(data: any): void {
        try {
            this.socket.json.emit('send-shogi', data);
        } catch (e) {
            console.log(e);
        }
    }
}
