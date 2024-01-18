import { LightningElement, api } from 'lwc';

export default class ShowCurrentRecordDetailsComponent extends LightningElement {
    @api recordId;
    @api objectApiName;
}