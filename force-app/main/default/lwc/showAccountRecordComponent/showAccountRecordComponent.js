import { LightningElement, api } from 'lwc';

export default class ShowAccountRecordComponent extends LightningElement {
    @api recordId;
    @api objectApiName;
}