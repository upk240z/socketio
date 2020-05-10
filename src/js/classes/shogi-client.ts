import io from "socket.io-client";
import {Piece} from "./piece";

export class ShogiClient {
    private readonly socket: SocketIOClient.Socket|any;

    private _pieces: Piece[] = [];
    get pieces(): Piece[] {
        return this._pieces;
    }

    set pieces(pieces: Piece[]) {
        this._pieces = pieces;
    }

    constructor(url: string, callback: Function) {
        try {
            this.socket = io.connect(url);
            this.socket.on('cast-shogi', (data: any) => {
                callback(data);
            });
        } catch (e) {
            console.log(e);
        }

        const initializer = [
            [1, false, 'kyo.png', 'nkyo.png'],
            [2, false, 'kei.png', 'nkei.png'],
            [3, false, 'gin.png', 'ngin.png'],
            [4, false, 'kin.png', null],
            [5, false, 'gyoku.png', null],
            [6, false, 'kin.png', null],
            [7, false, 'gin.png', 'ngin.png'],
            [8, false, 'kei.png', 'nkei.png'],
            [9, false, 'kyo.png', 'nkyo.png'],
            [11, false, 'hisya.png', 'ryu.png'],
            [17, false, 'kaku.png', 'uma.png'],
            [19, false, 'fu.png', 'to.png'],
            [20, false, 'fu.png', 'to.png'],
            [21, false, 'fu.png', 'to.png'],
            [22, false, 'fu.png', 'to.png'],
            [23, false, 'fu.png', 'to.png'],
            [24, false, 'fu.png', 'to.png'],
            [25, false, 'fu.png', 'to.png'],
            [26, false, 'fu.png', 'to.png'],
            [27, false, 'fu.png', 'to.png'],
            [55, true, 'fu.png', 'to.png'],
            [56, true, 'fu.png', 'to.png'],
            [57, true, 'fu.png', 'to.png'],
            [58, true, 'fu.png', 'to.png'],
            [59, true, 'fu.png', 'to.png'],
            [60, true, 'fu.png', 'to.png'],
            [61, true, 'fu.png', 'to.png'],
            [62, true, 'fu.png', 'to.png'],
            [63, true, 'fu.png', 'to.png'],
            [65, true, 'kaku.png', 'uma.png'],
            [71, true, 'hisya.png', 'ryu.png'],
            [73, true, 'kyo.png', 'nkyo.png'],
            [74, true, 'kei.png', 'nkei.png'],
            [75, true, 'gin.png', 'ngin.png'],
            [76, true, 'kin.png', null],
            [77, true, 'ou.png', null],
            [78, true, 'kin.png', null],
            [79, true, 'gin.png', 'ngin.png'],
            [80, true, 'kei.png', 'nkei.png'],
            [81, true, 'kyo.png', 'nkyo.png']
        ];

        let no = 0;
        for (const p of initializer) {
            no++;
            if (p) {
                const piece = new Piece(
                    no, <boolean>p[1], <string>p[2], <string>p[3]
                );
                piece.position = <number>p[0];
                this._pieces.push(piece);
            }
        }
    }

    public send(): void {
        try {
            this.socket.json.emit('send-shogi', this._pieces);
        } catch (e) {
            console.log(e);
        }
    }

    public findPieceById(id: number): Piece | null {
        for (const p of this._pieces) {
            if (p.id == id) {
                return p;
            }
        }
        return null;
    }

    public findPieceByPos(pos: number): Piece | null {
        for (const p of this._pieces) {
            if (p.position == pos) {
                return p;
            }
        }
        return null;
    }

    public movePiece(dragPieceId: number, dropCellNo: number): void {
        const dragPiece: Piece | any = this.findPieceById(dragPieceId);
        const dropPiece: Piece | any = this.findPieceByPos(dropCellNo);

        if (dragPiece == dropPiece) {
            return;
        }

        dragPiece.position = dropCellNo;
        if (dropPiece != null) {
            dropPiece.position = dragPiece.isForward ? -1 : -2;
            dropPiece.isFront = true;
            dropPiece.isForward = dropPiece.position == -1;
        }

        if (dragPiece.position < 0) {
            dragPiece.isFront = true;
            dragPiece.isForward = dragPiece.position == -1;
        }

        this.send();
    }

    public clickPiece(id: number): void {
        const piece = this.findPieceById(id);
        if (piece == null || piece.position < 0) { return; }

        if (piece.onlyFront) {
            piece.isForward = !piece.isForward;
        } else {
            if (piece.isFront) {
                piece.isFront = false;
            } else {
                piece.isForward = !piece.isForward;
                piece.isFront = true;
            }
        }

        this.send();
    }
}
