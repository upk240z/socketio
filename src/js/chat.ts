import $ from 'jquery';
import {ChatClient} from './classes/chat-client';
// @ts-ignore
import Vue from 'vue/dist/vue';

(() => {
    const app = new Vue({
        el: '#app',
        data: {
            talk: []
        }
    });

    const client = new ChatClient(
        location.protocol + '//' + location.host,
        (message: string) => {
            app.talk.push(message);
        }
    );

    $('#main-form').on('submit', () => {
        const textBox = $('input[name=message]');
        const message: any = textBox.val();
        client.sendMessage(message);
        app.talk.push(message);
        textBox.val('');
        return false;
    });
})();
