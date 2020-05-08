import $ from 'jquery';
// @ts-ignore
import Vue from 'vue/dist/vue';
import {ShogiClient} from "./classes/shogi-client";
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
import {PieceManager} from "./classes/piece-manager";
import {Piece} from "./classes/piece";

(() => {
    const manager: PieceManager = new PieceManager();

    const app = new Vue({
        el: '#board',
        data: {
            pieces: manager.pieces
        },
        methods: {
            getPiece: function(pos: number): Piece|any {
                // @ts-ignore
                for (const p of this.pieces) {
                    if (p.position == pos) { return p; }
                }
                return null;
            }
        }
    });

    const client = new ShogiClient(
        location.protocol + '//' + location.host,
        (data: Piece[]) => {
            manager.pieces = data;
            app.pieces = manager.pieces;
            app.$nextTick(() => {
                setEvent();
            });
        }
    );

    const setEvent = () => {
        $('.piece').draggable({
            revert: "invalid"
        });
        $('#board .cell').droppable({
            drop: function(e, ui) {
                const draggable = $(ui.draggable[0]);
                const dragPieceId = parseInt(<string>draggable.attr('piece-id'));
                const dropCellNo = parseInt(<string>$(this).attr('cell-no'));
                manager.movePiece(dragPieceId, dropCellNo);
                app.pieces = manager.pieces;
                client.send(app.pieces);
                draggable
                    .css('top', '0')
                    .css('left', '0');
                app.$nextTick(() => {
                    $('.piece').draggable({
                        revert: "invalid"
                    });
                });
            }
        });
    };

    app.$nextTick(() => {
        setEvent();
    });

})();
