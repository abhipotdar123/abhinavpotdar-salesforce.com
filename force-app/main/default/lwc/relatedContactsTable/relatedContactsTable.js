import { LightningElement, wire, api } from 'lwc';
import getAllRelatedContacts from '@salesforce/apex/RelatedRecordsController.getAllRelatedContacts';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Lead Source', fieldName: 'LeadSource', type: 'text' }
];

export default class RelatedContactsTable extends LightningElement {
    @api accountId; // Property to hold the account Id
    relatedContacts = []; // Property to store the related contacts
    columns = COLUMNS;
    error;

    // This method will be called when the accountId property is set from the parent component
    @api
    setAccountId(accountId) {
        this.accountId = accountId;
        this.loadRelatedContacts();
    }

    @wire(getAllRelatedContacts, { AccountIds: '$accountId' })
    wiredContacts({ error, data }) {
        if (data) {
            this.relatedContacts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.relatedContacts = [];
        }
    }

    loadRelatedContacts() {
        // Call wire method manually to reload the data when the accountId property changes
        this.wiredContacts();
    }
}