import { LightningElement, wire, track } from 'lwc';
import GetAllAccountRecords from '@salesforce/apex/AccountRecordsController.GetAllAccountRecords';
export default class ImperativeCallComponent extends LightningElement {
    @track accountRecords;

    onShowAllAccounts() {
        GetAllAccountRecords()
            .then(result => {
                this.accountRecords = result;
            })
            .catch(error => {
                console.log('Errors Occured: ' + error);
            })
    }
}