export class Piece {
    readonly id: number;
    readonly isForward: boolean;
    readonly frontImg: string;
    readonly backImg: string;
    readonly isFront: boolean;
    position: number = 0; // -1:stock for first -2:stock for second

    constructor(
        id: number,
        isForward: boolean,
        frontImg: string,
        backImg: string,
        isFront: boolean = true
    ) {
        this.id = id;
        this.isForward = isForward;
        this.isFront = isFront;
        this.frontImg = frontImg;
        this.backImg = backImg;
    }
}
