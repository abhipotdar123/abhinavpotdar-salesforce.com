import { LightningElement, wire, track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import getObjectFields from '@salesforce/apex/metaDataController.getObjectFields';
import getAllObjects from '@salesforce/apex/metaDataController.getAllObjects';
import getInfo from '@salesforce/apex/metaDataController.getInfo';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DataRetrieveAppforUAT extends LightningElement {
    //Array Vaiables
    objectNames = [];
    @track fieldOptions = [];
    @track selectedFields = [];
    @track tableData = [];
    @track columns = [];
    
    @track darkMode = false;
    @track DisplayMode = "container lightMode textStyle";
    //String Variables
    @track selectedObject = 'Select the Object';
    @track currentStep = 'step1';
    @track iconName = '';
    @track labels = '';
    @track selectFields = '';
    @track count = '';
    @track retrievalDate = '';

    // Boolean Variables
    @track isAllFieldsSelected = false;
    @track isFirst = true;
    @track isFields = false;
    @track isTable = false;
    @track isLoading = false;
    @track isDownload = false;

    // Get all the information of Objects present in org
    @wire(getAllObjects)
    getObjectNames({ data, error }) {
        if (data) {
            this.objectNames = data;
        } else if (error) {
            console.error(error);
        }
    }

    @wire(getObjectInfo, { objectApiName: '$objectNames' })
    objectInfo({ error, data }) {
        if (data) {
            const accessibleObjects = [];
            Object.keys(data).forEach((objectName) => {
                const objDescribe = data[objectName];
                if (objDescribe && objDescribe.isAccessible()) {
                    accessibleObjects.push(objectName);
                }
            });
            const objectIcon = data.themeInfo.iconUrl;
            this.objectNames = accessibleObjects;
        } else if (error) {
            console.error(error);
        }
    }

    get picklistOptions() {
        const standardObjects = [];
        const customObjects = [];

        this.objectNames.forEach((objectName) => {
            if (objectName.startsWith('__c')) {
                customObjects.push(objectName);
            } else {
                standardObjects.push(objectName);
            }
        });

        standardObjects.sort();
        customObjects.sort();

        const options = [
            { label: 'Standard Objects', value: '', disabled: true },
            ...standardObjects.map((objectName) => ({
                label: objectName.charAt(0).toUpperCase() + objectName.slice(1),
                value: objectName
            })),
            { label: 'Custom Objects', value: '', disabled: true },
            ...customObjects.map((objectName) => ({
                label: objectName.charAt(0).toUpperCase() + objectName.slice(1),
                value: objectName
            }))
        ];
        return options;
    }

    handleObjectSelection(event) {
        const selectedObject = event.detail.value;
        this.selectedObject = selectedObject;
        this.iconName = "standard:" + selectedObject;
        this.labels = "Selected Object: " + selectedObject;
        console.log('Selected Object:', selectedObject);
        this.isFirst = false;
        this.isLoading = true;
        this.currentStep = 'step2';
        this.isFields = true;
    }

    handleSelectAllFields(event) {
        this.isAllFieldsSelected = event.target.checked;
        if (this.isAllFieldsSelected) {
            this.selectedFields = this.fieldOptions.map(option => option.value);
            this.selectFields = 'All Fields';
        } else {
            this.selectedFields = [];
        }
    }

    handleFieldChange(event) {
        this.selectedFields = event.detail.value;
    }

    // Wire Apex method to retrieve object fields
    @wire(getObjectFields, { objectName: '$selectedObject' })
    wiredFields({ error, data }) {
        if (data) {
            const objectFields = data[this.selectedObject];
            console.log('Object Fields:', objectFields);
            if (objectFields) {
                this.fieldOptions = objectFields.map(field => ({ label: field, value: field }));
                if (this.isAllFieldsSelected) {
                    this.selectedFields = this.fieldOptions.map(option => option.value);
                }
            }
            this.isLoading = false; // Hide loading spinner
        } else if (error) {
            console.error('Error retrieving object fields:', error);
            this.isLoading = false; // Hide loading spinner in case of an error
        }
    }

    //Create table of selected fields
    handleOpenModal() {
        this.isFirst = false;
        this.isFields = false;
        this.currentStep = "step3";
        const query = this.selectedFields.join(',');
        console.log('Fields: ' + query);

        getInfo({ query, objectName: this.selectedObject, numberofMonths: 6 })
            .then(result => {
                console.log('Records:', JSON.parse(JSON.stringify(result)));
                this.count = result.length;
                console.log('count ', this.count);
                this.retrievalDate = result.retrievalDate; // Retrieval date
                this.isTable = true;
                this.tableData = result;
                this.currentStep = "step4";
                this.generateColumns();
                this.showToast('Success', 'Data Retrieved Successfully', 'success');
            })
            .catch(error => {
                console.error('Error retrieving data:', error.message);
                this.showToast('Error', 'Error retrieving data', 'error');
            });
    }
    // Generate columns for datatable based on selected fields
    generateColumns() {
        console.log('selectedFields: ' + this.selectedFields);
        this.columns = this.selectedFields.map(field => ({
            label: field,
            fieldName: field,
            type: 'text',
        }));
    }
    handleDownload() {
        this.isTable = false;
        this.isDownload = true;
    }

    // Handle Excel export
    handleExcel() {
        this.currentStep = "step5";
        const csvContent = this.generateCsvContent();
        const element = document.createElement('a');
        element.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
        element.target = '_blank';
        element.download = this.selectedObject + '.csv';
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        // Reset all variables to their initial values
        this.objectNames = [];
        this.fieldOptions = [];
        this.selectedFields = [];
        this.tableData = [];
        this.columns = [];
        this.selectedObject = 'Select the Object';
        this.currentStep = 'step1';
        this.iconName = '';
        this.labels = '';
        this.selectFields = '';
        this.count = '';
        this.retrievalDate = '';
        this.isAllFieldsSelected = false;
        this.isFirst = true;
        this.isFields = false;
        this.isTable = false;
        this.isLoading = false;
        this.isDownload = false;
    }
    handleToggle(event){
        this.darkMode = event.target.checked;
        if(this.darkMode){
            this.DisplayMode = "container dark textStyle";
        }
        else{
            this.DisplayMode = "container lightMode textStyle";
        }
    }
    // Generate CSV content for export
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
    // Show toast message
    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }

    // Method to get the label of the selected object
    getSelectedObjectLabel() {
        if (this.selectedObject !== 'Select the Object') {
            // Return the label with the icon
            return `<lightning-icon icon-name="standard:${this.selectedObject}" size="small" class="slds-m-right_x-small"></lightning-icon> ${this.selectedObject}`;
        }
        return this.selectedObject;
    }
}