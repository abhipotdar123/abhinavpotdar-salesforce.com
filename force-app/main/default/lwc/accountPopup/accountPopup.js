import { LightningElement, wire, api } from 'lwc';
import getAccountData from '@salesforce/apex/AccountController.getAccountData';

const ACCOUNT_COLUMNS = [
    { label: 'Account Name', fieldName: 'Name', type: 'text' },
    { label: 'Industry', fieldName: 'Industry', type: 'text' },
    { label: 'Type', fieldName: 'Type', type: 'text' }
];

export default class AccountPopup extends LightningElement {
    @api showPopup = false;
    @api modalHeader = 'More Account Records';
    accountIds = [];

    @wire(getAccountData, { accountIds: '$accountIds' })
    accountRecords;

    get accountData() {
        if (this.accountRecords.data) {
            return this.accountRecords.data;
        }
        return [];
    }

    get accountColumns() {
        return ACCOUNT_COLUMNS;
    }

    closePopup() {
        this.showPopup = false;
    }

    handleRowAction(event) {
        const accountId = event.detail.row.Id;
        // Do something with the selected Account record
        console.log('Selected Account Id: ' + accountId);
        // Close the popup
        this.showPopup = false;
    }

    handleMoreRecords() {
        // Get all Account Ids and remove the first 10 (already displayed)
        const allIds = this.accountRecords.data.map(record => record.Id);
        const remainingIds = allIds.slice(10);
        // Set the remaining Account Ids as a parameter for the getAccountData Apex method call
        this.accountIds = remainingIds;
        // Open the popup
        this.showPopup = true;
    }
}