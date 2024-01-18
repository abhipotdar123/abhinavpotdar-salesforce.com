import { LightningElement, wire, track } from 'lwc';
import getCurrentUser from '@salesforce/apex/RelatedRecordsController.getloggedUser';
import getAllAccountRecords from '@salesforce/apex/RelatedRecordsController.getAllAccountRecords';

export default class RelatedRecordsComponent extends LightningElement {
    @track users;
    @track accountRecords;
    @track selectedAccountId; // Reactive property to hold the selected account Id
    @track value = ''; // Reactive property to store the selected value

    @wire(getCurrentUser)
    wiredUsers({ error, data }) {
        if (data) {
            this.users = data;
            console.log('Users ', this.users);
        } else if (error) {
            console.error(error);
        }
    }

    @wire(getAllAccountRecords)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accountRecords = data;
            console.log('Accounts: ', this.accountRecords);
        } else if (error) {
            console.error(error);
        }
    }

    get options() {
        if (!this.accountRecords) {
            return [];
        }

        return this.accountRecords.map((account) => ({
            label: account.Name,
            value: account.Id
        }));
    }

    handleChange(event) {
        this.selectedAccountId = event.detail.value; // Update the selected account Id
        this.value = this.selectedAccountId; // Update the selected value
    }
}