// LWC component
import { LightningElement, api, wire } from 'lwc';
import GetAllAccountRecords from '@salesforce/apex/AccountRecordsController.GetAllAccountRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const cols = [
    { label: 'Account Id', fieldName: 'Id' },
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Rating', fieldName: 'Rating' },
    { label: 'Industry Name', fieldName: 'Industry' },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue' },
    { label: 'Contact Number', fieldName: 'Phone' },
    { label: 'Fax Number', fieldName: 'Fax' }
];

export default class ShowAccountsTableComponent extends LightningElement {
    @api accountRecords;
    @api columns = cols;
    @wire(GetAllAccountRecords)
    GetAccountRecords({ data, error }) {
        if (data) {
            this.accountRecords = data;

            // Show success toast message
            const successToast = new ShowToastEvent({
                title: 'Success',
                message: 'Account records retrieved successfully.',
                variant: 'success',
                mode: 'dismissable'
            });
            this.dispatchEvent(successToast);
        } else if (error) {
            const errorToast = new ShowToastEvent({
                title: 'Error',
                message: error,
                variant: 'error',
                mode: 'dismissable'
            });
            this.dispatchEvent(errorToast);
        }
    }
}