import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getObjectFields from '@salesforce/apex/metaDataController.getObjectFields';
import getInfo from '@salesforce/apex/metaDataController.getInfo';

export default class Automate_retrieve_data_dynamically extends LightningElement {
    selectedObject = '';
    fieldOptions = [];
    selectedFields = [];
    isAllFieldsSelected = false;
    @track columns = [
        { label: 'Id', fieldName: 'Id', type: 'text' },
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'ParentRoleId', fieldName: 'ParentRoleId', type: 'text' },
        { label: 'RollupDescription', fieldName: 'RollupDescription', type: 'text' },
        { label: 'OpportunityAccessForAccountOwner', fieldName: 'OpportunityAccessForAccountOwner', type: 'text' },
        { label: 'CaseAccessForAccountOwner', fieldName: 'CaseAccessForAccountOwner', type: 'text' },
        { label: 'ContactAccessForAccountOwner', fieldName: 'ContactAccessForAccountOwner', type: 'text' },
        { label: 'ForecastUserId', fieldName: 'ForecastUserId', type: 'text' },
        { label: 'MayForecastManagerShare', fieldName: 'MayForecastManagerShare', type: 'text' },
        { label: 'LastModifiedDate', fieldName: 'LastModifiedDate', type: 'date' },
        { label: 'LastModifiedById', fieldName: 'LastModifiedById', type: 'text' },
        { label: 'SystemModstamp', fieldName: 'SystemModstamp', type: 'date' },
        { label: 'DeveloperName', fieldName: 'DeveloperName', type: 'text' },
        { label: 'PortalAccountId', fieldName: 'PortalAccountId', type: 'text' },
        { label: 'PortalType', fieldName: 'PortalType', type: 'text' },
        { label: 'PortalRole', fieldName: 'PortalRole', type: 'text' },
        { label: 'PortalAccountOwnerId', fieldName: 'PortalAccountOwnerId', type: 'text' }
    ];
    columnfields = [];
    @track isFirst = true;
    @track isTable = false;
    @track tableData = [];
    @track isSecond = false;
    @track hierarchicalTableData = []; // To store hierarchical data
    @track hierarchicalColumns = []; // To store hierarchical columns

    get options() {
        return [
            { label: 'None', value: 'None' },
            { label: 'Account', value: 'Account' },
            { label: 'Contact', value: 'Contact' },
            { label: 'Opportunity', value: 'Opportunity' },
        ];
    }

    steps = [
        { label: 'Select the Object', value: 'step-1' },
        { label: 'Open', value: 'step-2' },
        { label: 'Unqualified', value: 'step-3' },
        { label: 'Nurturing', value: 'step-4' },
        { label: 'Closed', value: 'step-5' },
    ];
    
    handleObjectChange(event) {
        this.selectedObject = event.detail.value;
        this.fieldOptions = []; // Reset field options when object changes
        this.selectedFields = []; // Reset selected fields when object changes
        this.isSecond = true;
        this.isFirst = false;
    }

    handleFieldChange(event) {
        this.selectedFields = event.detail.value;
    }

    handleSelectAllFields(event) {
        this.isAllFieldsSelected = event.target.checked;
        if (this.isAllFieldsSelected) {
            this.selectedFields = this.fieldOptions.map(option => option.value);
        } else {
            this.selectedFields = [];
        }
    }

    handleOpenModal() {
        const query = this.selectedFields.join(',');
        getInfo({ query, objectName: this.selectedObject, numberofMonths: 6 })
            .then(result => {
                this.isTable = true;
                this.tableData = result;
                this.hierarchicalTableData = this.buildHierarchicalData(result); // Generate hierarchical data
                this.hierarchicalColumns = this.generateHierarchicalColumns(); // Generate hierarchical columns
                this.generateColumns();
                this.showToast('Success', 'Data Retrieved Successfully', 'success');
            })
            .catch(error => {
                console.error('Error retrieving data:', error.message);
                this.showToast('Error', 'Error retrieving data', 'error');
            });
    }
    
    generateHierarchicalColumns() {
        // Example: Generate hierarchical columns based on your data structure
        const hierarchicalColumns = [
            { label: 'Name', fieldName: 'Name', type: 'text' },
            { label: 'Parent Field', fieldName: 'Parent_Field__c', type: 'text' },
            // Add more columns as needed
        ];
        return hierarchicalColumns;
    }
    
    buildHierarchicalData(records) {
        // Example: Build hierarchical data based on your data structure
        const hierarchicalData = [];
        // Logic to structure data hierarchically
        return hierarchicalData;
    }

    generateHierarchicalCsvContent(data) {
        // Example: Generate hierarchical CSV content
        const headers = this.hierarchicalColumns.map(column => column.label).join(',');
        const rows = data.map(record => {
            const rowValues = this.hierarchicalColumns.map(column => {
                let fieldValue = record[column.fieldName];
                // Additional formatting if needed
                return fieldValue;
            });
            return rowValues.join(',');
        });
        const csvContent = [headers, ...rows].join('\n');
        return csvContent;
    }

    handleCloseModal() {
        this.isTable = false;
        this.tableData = [];
    }

    handleExcel() {
        const csvContent = this.generateCsvContent(); // Regular CSV for non-hierarchical data
        const hierarchicalCsvContent = this.generateHierarchicalCsvContent(this.hierarchicalTableData);

        const element = document.createElement('a');
        element.href = 'data:text/csv;charset=utf-8,' + encodeURI(hierarchicalCsvContent);
        element.target = '_blank';
        element.download = this.selectedObject + '_hierarchical.csv';
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element);
    }

    generateCsvContent() {
        const headers = this.columns.map((column) => column.label).join(',');

        const rows = this.tableData.map((record) => {
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

    handleReset(){
        this.selectedObject = '';
        this.fieldOptions = [];
        this.selectedFields = [];
        this.isAllFieldsSelected = false;
        this.columns = [
            { label: 'Id', fieldName: 'Id', type: 'text' },
            { label: 'Name', fieldName: 'Name', type: 'text' },
            { label: 'ParentRoleId', fieldName: 'ParentRoleId', type: 'text' },
            { label: 'RollupDescription', fieldName: 'RollupDescription', type: 'text' },
            { label: 'OpportunityAccessForAccountOwner', fieldName: 'OpportunityAccessForAccountOwner', type: 'text' },
            { label: 'CaseAccessForAccountOwner', fieldName: 'CaseAccessForAccountOwner', type: 'text' },
            { label: 'ContactAccessForAccountOwner', fieldName: 'ContactAccessForAccountOwner', type: 'text' },
            { label: 'ForecastUserId', fieldName: 'ForecastUserId', type: 'text' },
            { label: 'MayForecastManagerShare', fieldName: 'MayForecastManagerShare', type: 'text' },
            { label: 'LastModifiedDate', fieldName: 'LastModifiedDate', type: 'date' },
            { label: 'LastModifiedById', fieldName: 'LastModifiedById', type: 'text' },
            { label: 'SystemModstamp', fieldName: 'SystemModstamp', type: 'date' },
            { label: 'DeveloperName', fieldName: 'DeveloperName', type: 'text' },
            { label: 'PortalAccountId', fieldName: 'PortalAccountId', type: 'text' },
            { label: 'PortalType', fieldName: 'PortalType', type: 'text' },
            { label: 'PortalRole', fieldName: 'PortalRole', type: 'text' },
            { label: 'PortalAccountOwnerId', fieldName: 'PortalAccountOwnerId', type: 'text' }
        ];
        this.columnfields = [];
        this.isTable = false;
        this.tableData = [];
    }

    @wire(getObjectFields, { objectName: '$selectedObject' })
    wiredFields({ error, data }) {
        if (data) {
            const objectFields = data[this.selectedObject];
            if (objectFields) {
                this.fieldOptions = objectFields.map(field => ({ label: field, value: field }));
                if (this.isAllFieldsSelected) {
                    this.selectedFields = this.fieldOptions.map(option => option.value);
                }
            }
        } else if (error) {
            console.error('Error retrieving object fields:', error);
            this.showToast('Error', 'Error retrieving object fields', 'error');
        }
    }

    generateColumns() {        
        console.log('selectedFields: ' + this.selectedFields);
        this.columns = this.selectedFields.map(field => ({
            label: field,
            fieldName: field,
            type: 'text',
        }));
        console.log('columns: ', this.columns);
    }

    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }
}