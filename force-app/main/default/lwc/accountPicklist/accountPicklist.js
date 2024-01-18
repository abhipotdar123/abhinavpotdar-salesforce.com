import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getRecentAccounts from '@salesforce/apex/AccountController.getRecentAccounts';
import getAccountData from '@salesforce/apex/AccountController.getAccountData';
import getSelectedAccount from '@salesforce/apex/AccountController.getSelectedAccount';
import { refreshApex } from '@salesforce/apex';

export default class AccountPicklist extends NavigationMixin(LightningElement) {
    accountOptions = [];
    selectedValue;
    recordId;
    accounts;
    error;
    @track openmodel = false;
    objectApiName = 'Account';
    isMoreRecords;
    isRecordId;
    isNewRecord;
    accName;
    accType;
    accIndustry;
    accRating;
    accWebsite;
    accAnnualRevenue;

    columns = [
        { label: 'Account Name', fieldName: 'Name', type: 'text' },
        { label: 'Industry', fieldName: 'Industry', type: 'text' },
        { label: 'Rating', fieldName: 'Rating', type: 'text' },
        { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' }
    ];

    @wire(getRecentAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accountOptions = [{ 
                label: 'Create new Account', 
                value: 'Create new Account', 
                iconName: 'utility:add', 
                iconPosition: 'left' }, 
                ...(data?.map(acc => ({ label: acc.Name, value: acc.Id })) ?? []),
            { label: 'More Records', value: 'More Records' }
            ];

        } else if (error) {
            console.log('Error retrieving recent Accounts: ' + error);
        }
    }

    openmodal() {
        this.openmodel = true
    }
    closeModal() {
        this.openmodel = false
    }
    handleTypeChange(event) {
        console.log('New Type value: ', event.target.value);
        console.log('New Type value: ', event.target.oldvalue);
    }

    handleChange(event) {
        this.openmodal();
        const selectedValue = event.target.value;
        this.recordId = selectedValue;
        if (selectedValue === 'More Records') {
            this.isMoreRecords = true;
            console.log('more Records' + selectedValue);
            getAccountData()
                .then((result) => {
                    this.accounts = result;
                    console.log('Accounts:: ' + this.accounts);
                    this.error = undefined;
                })
                .catch((error) => {
                    this.error = error;
                    this.accounts = undefined;
                });
        } else {
            this.isRecordId = true;
            getSelectedAccount({ recordId: selectedValue })
                .then((result) => {
                    this.accounts = JSON.parse(JSON.stringify(result));
                    console.log('Accounts:: ' + this.accounts);
                    this.error = undefined;
                })
                .catch((error) => {
                    this.error = error;
                    this.accounts = undefined;
                });
        }
    }
    handleLoad(event) {
        console.log(event.type);
        console.log(event.detail);
    }

    handleSubmit(event) {
        console.log(event.type);
        console.log(event.detail);
        event.preventDefault(); // stop the default behaviour of the event - submit the record
        let fields = event.detail.fields;
        this.template.querySelector("lightning-record-edit-form").submit(fields);
    }

    handleSuccess(event) {
        console.log(event.type);
        console.log(event.detail);
        console.log(event.detail.id);
        this.wiredData?.refreshApex();
    }   

    handleError(event) {
        console.log(event.type);
        console.log(event.detail);
        console.log(event.detail?.detail);
    }    

}