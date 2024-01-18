import { LightningElement, track } from 'lwc';
import SearchCasesByStatus from '@salesforce/apex/CaseRecordsController.SearchCasesByStatus';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
const cols = [
    {label:'Case Number', fieldName: 'CaseNumber'},
    {label: 'Case Status', fieldName: 'Status'},
    {label: 'Case Priority', fieldName: 'Priority'},
    {label: 'Case Type', fieldName: 'Type'},
    {label: 'Case Origin', fieldName: 'Origin'},
    {label: 'Case Reason', fieldName: 'Reason'},
    {label: 'Case Subject', fieldName: 'Subject'},
];

export default class SearchCaseRecordsComponent extends LightningElement {
    @track caseStatus; 
    @track caseRecords;
    @track columns = cols;

    handleCaseStatusChange(event){
        this.caseStatus = event.target.value;
    }

    handleSearchCases(){
        SearchCasesByStatus({caseRecordStatus: this.caseStatus})
            .then(result => {
                this.caseRecords = result;
                const showSuccessToast = new ShowToastEvent({
                    title: 'Success',
                    message: 'Case records retrieved successfully.',
                    variant: 'success',
                    mode: 'dismissable'
                });
                this.dispatchEvent(showSuccessToast);
            })
            .catch(error =>{
                console.log('ERRO Occured: '+error);
                const errorToast = new ShowToastEvent({
                    title: 'Error',
                    message: error,
                    variant: 'error',
                    mode: 'dismissable'
                });
                this.dispatchEvent(errorToast);
            })
    }
}