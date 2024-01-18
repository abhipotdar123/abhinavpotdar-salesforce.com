import { LightningElement, wire, track } from 'lwc';
import fetchDataFromApex from '@salesforce/apex/automate_retrieve_data_controller.getObject';

export default class Automate_retrieve_data extends LightningElement {
    value = ''; columnHeader = [];
    @track isAccount = false;
    @track isContact = false;
    @track Data = {};
    @track isDownload = false;
    columns = [];
    get options() {
        return [
            { label: 'None', value: 'None' },
            { label: 'Account', value: 'Account' },
            { label: 'Contact', value: 'Contact' },
            { label: 'Opportunity', value: 'Opportunity' },
        ];
    }

    
    handleChange(event) {
        this.value = event.detail.value;
        console.log(this.value);

        fetchDataFromApex({ objectName: this.value })
            .then(result => {
                if (this.value === 'Account') {
                    this.isAccount = true;
                    this.isContact = false;
                    console.log('Actual Result:', result[0].Id);
                    console.log('Account Records:', JSON.parse(JSON.stringify(result)));
                    this.Data = result;
                    this.isDownload = true;

                    this.columns = [
                        { label: 'Account Number', fieldName: 'AccountNumber', type: 'text' },
                        { label: 'Account Source', fieldName: 'AccountSource', type: 'text' },
                        { label: 'Account ID', fieldName: 'Account_ID__c', type: 'text' },
                        { label: 'Active', fieldName: 'Active__c', type: 'text' },
                        { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'text' },
                        { label: 'Billing Address', fieldName: 'BillingAddress', type: 'text' },
                        { label: 'Billing City', fieldName: 'BillingCity', type: 'text' },
                        { label: 'Billing Country', fieldName: 'BillingCountry', type: 'text' },
                        { label: 'Billing Geocode Accuracy', fieldName: 'BillingGeocodeAccuracy', type: 'text' },
                        { label: 'Billing Latitude', fieldName: 'BillingLatitude', type: 'text' },
                        { label: 'Billing Longitude', fieldName: 'BillingLongitude', type: 'text' },
                        { label: 'Billing Postal Code', fieldName: 'BillingPostalCode', type: 'text' },
                        { label: 'Billing State', fieldName: 'BillingState', type: 'text' },
                        { label: 'Billing Street', fieldName: 'BillingStreet', type: 'text' },
                        { label: 'Channel Program Level Name', fieldName: 'ChannelProgramLevelName', type: 'text' },
                        { label: 'Channel Program Name', fieldName: 'ChannelProgramName', type: 'text' },
                        { label: 'Clean Status', fieldName: 'CleanStatus', type: 'text' },
                        { label: 'Company Name', fieldName: 'Company_Name__c', type: 'text' },
                        { label: 'Contact Name', fieldName: 'Contact_Name__c', type: 'text' },
                        { label: 'Created By ID', fieldName: 'CreatedById', type: 'text' },
                        { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' },
                        { label: 'Customer Priority', fieldName: 'CustomerPriority__c', type: 'text' },
                        { label: 'D&B Company ID', fieldName: 'DandbCompanyId', type: 'text' },
                        { label: 'Description', fieldName: 'Description', type: 'text' },
                        { label: 'DUNS Number', fieldName: 'DunsNumber', type: 'text' },
                        { label: 'Email', fieldName: 'Email__c', type: 'text' },
                        { label: 'Fax', fieldName: 'Fax', type: 'phone' },
                        { label: 'ID', fieldName: 'Id', type: 'text' },
                        { label: 'Industry', fieldName: 'Industry', type: 'text' },
                        { label: 'Is Customer Portal', fieldName: 'IsCustomerPortal', type: 'text' },
                        { label: 'Is Deleted', fieldName: 'IsDeleted', type: 'text' },
                        { label: 'Is Partner', fieldName: 'IsPartner', type: 'text' },
                        { label: 'Jigsaw', fieldName: 'Jigsaw', type: 'text' },
                        { label: 'Jigsaw Company ID', fieldName: 'JigsawCompanyId', type: 'text' },
                        { label: 'Last Activity Date', fieldName: 'LastActivityDate', type: 'date' },
                        { label: 'Last Modified By ID', fieldName: 'LastModifiedById', type: 'text' },
                        { label: 'Last Modified Date', fieldName: 'LastModifiedDate', type: 'date' },
                        { label: 'Last Referenced Date', fieldName: 'LastReferencedDate', type: 'date' },
                        { label: 'Last Viewed Date', fieldName: 'LastViewedDate', type: 'date' },
                        { label: 'Master Record ID', fieldName: 'MasterRecordId', type: 'text' },
                        { label: 'NAICS Code', fieldName: 'NaicsCode', type: 'text' },
                        { label: 'NAICS Description', fieldName: 'NaicsDesc', type: 'text' },
                        { label: 'Name', fieldName: 'Name', type: 'text' },
                        { label: 'Number of Employees', fieldName: 'NumberOfEmployees', type: 'text' },
                        { label: 'Number of Locations', fieldName: 'NumberofLocations__c', type: 'text' },
                        { label: 'Operating Hours ID', fieldName: 'OperatingHoursId', type: 'text' },
                        { label: 'Owner ID', fieldName: 'OwnerId', type: 'text' },
                        { label: 'Ownership', fieldName: 'Ownership', type: 'text' },
                        { label: 'Parent ID', fieldName: 'ParentId', type: 'text' },
                        { label: 'Phone', fieldName: 'Phone', type: 'phone' },
                        { label: 'Phone (Custom Field)', fieldName: 'Phone__c', type: 'phone' },
                        { label: 'Photo URL', fieldName: 'PhotoUrl', type: 'url' },
                        { label: 'Rating', fieldName: 'Rating', type: 'text' },
                        { label: 'Shipping Address', fieldName: 'ShippingAddress', type: 'text' },
                        { label: 'Shipping City', fieldName: 'ShippingCity', type: 'text' },
                        { label: 'Shipping Country', fieldName: 'ShippingCountry', type: 'text' },
                        { label: 'Shipping Geocode Accuracy', fieldName: 'ShippingGeocodeAccuracy', type: 'text' },
                        { label: 'Shipping Latitude', fieldName: 'ShippingLatitude', type: 'text' },
                        { label: 'Shipping Longitude', fieldName: 'ShippingLongitude', type: 'text' },
                        { label: 'Shipping Postal Code', fieldName: 'ShippingPostalCode', type: 'text' },
                        { label: 'Shipping State', fieldName: 'ShippingState', type: 'text' },
                        { label: 'Shipping Street', fieldName: 'ShippingStreet', type: 'text' },
                        { label: 'SIC', fieldName: 'Sic', type: 'text' },
                        { label: 'SIC Description', fieldName: 'SicDesc', type: 'text' },
                        { label: 'Site', fieldName: 'Site', type: 'text' },
                        { label: 'SLA Expiration Date', fieldName: 'SLAExpirationDate__c', type: 'date' },
                        { label: 'SLA Serial Number', fieldName: 'SLASerialNumber__c', type: 'text' },
                        { label: 'SLA', fieldName: 'SLA__c', type: 'text' },
                        { label: 'System Modstamp', fieldName: 'SystemModstamp', type: 'date' },
                        { label: 'Ticker Symbol', fieldName: 'TickerSymbol', type: 'text' },
                        { label: 'Trade Style', fieldName: 'Tradestyle', type: 'text' },
                        { label: 'Type', fieldName: 'Type', type: 'text' },
                        { label: 'Upsell Opportunity', fieldName: 'UpsellOpportunity__c', type: 'text' },
                        { label: 'Website', fieldName: 'Website', type: 'url' },
                        { label: 'Year Started', fieldName: 'YearStarted', type: 'text' },
                    ];

                }

                if (this.value === 'Contact') {
                    this.isAccount = false;
                    this.isContact = true;
                    console.log('Contact Records:', JSON.parse(JSON.stringify(result)));
                    this.Data = result;
                    this.isDownload = true;

                    this.columns = [
                        { label: 'Id', fieldName: 'Id' },
                        { label: 'FirstName', fieldName: 'FirstName', type: 'text' },
                        { label: 'LastName', fieldName: 'LastName', type: 'text' },
                        { label: 'Lead Source', fieldName: 'LeadSource', type: 'text' },
                        { label: 'Email', fieldName: 'Email', type: 'email' },
                        { label: 'Phone', fieldName: 'Phone', type: 'phone' },
                        { label: 'Mailing City', fieldName: 'MailingCity', type: 'text' },
                        { label: 'AccountId', fieldName: 'AccountId', type: 'text' },
                        { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' }
                    ];

                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    reset() {
        this.value = '';
        this.isAccount = false;
        this.isContact = false;
        this.Data = {};
    }

    handleReset() {
        this.reset();
    }
    handleDownload() {
        const csvContent = this.generateCsvContent();
    
        const element = document.createElement('a');
        element.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
        element.target = '_blank';
        element.download = this.value+'.csv';
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
    
        document.body.removeChild(element);
    }
    
    generateCsvContent() {
        const headers = this.columns.map((column) => column.label).join(',');
    
        const rows = this.Data.map((record) => {
            const rowValues = this.columns.map((column) => {
                let fieldValue = record[column.fieldName];
                if (typeof fieldValue === 'string') {
                    fieldValue = fieldValue.replace(/"/g, '""'); // Escape double quotes by doubling them
                    if (fieldValue.includes(',') || fieldValue.includes('\n')) {
                        fieldValue = `"${fieldValue}"`; // Enclose field value in quotes if it contains commas or newlines
                    }
                }
                return fieldValue;
            });
            return rowValues.join(',');
        });
    
        const csvContent = [headers, ...rows].join('\n');
    
        return csvContent;
    }
    
}