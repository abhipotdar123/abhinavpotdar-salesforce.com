import { LightningElement, api } from 'lwc';

export default class ChatHistory extends LightningElement {
    @api chatHistory = [];

    get history() {
        return Object.values(this.chatHistory);
    }
}