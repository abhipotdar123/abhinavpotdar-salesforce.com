import { LightningElement, track, wire } from 'lwc';
import GetAllAccountRecords from '@salesforce/apex/AccountRecordsController.GetAllAccountRecords';

export default class ShowAccountRecordsComponent extends LightningElement {
    @track accountRecords;

    @wire (GetAllAccountRecords)
    getAccountRecords({data, error})
    {
        if(data)
        {
            this.accountRecords = data;
        }
        else if(error)
        {
            console.log('Error Occured....: '+ error);
        }
    }
}