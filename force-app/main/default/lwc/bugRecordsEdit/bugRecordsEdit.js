import { LightningElement,track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import BUG_OBJECT from '@salesforce/schema/Bug__c';
import FIELD_ASSIGNEDTO from '@salesforce/schema/Bug__c.Assigned_To__c';
import FIELD_ID from '@salesforce/schema/Bug__c.Bug_ID__c';
import FIELD_DATECREATED from '@salesforce/schema/Bug__c.Date_Created__c';
import FIELD_DATEUPDATED from '@salesforce/schema/Bug__c.Date_Updated__c';
import FIELD_DESCRIPTION from '@salesforce/schema/Bug__c.Description__c';
import FIELD_PRIORITY from '@salesforce/schema/Bug__c.Priority__c';
import FIELD_REPORTEDBY from '@salesforce/schema/Bug__c.Reported_By__c';
import FIELD_RESOLUTION from '@salesforce/schema/Bug__c.Resolution__c';
import FIELD_SEVERITY from '@salesforce/schema/Bug__c.Severity__c';
import FIELD_STATUS from '@salesforce/schema/Bug__c.Status__c';
import FIELD_STEPS from '@salesforce/schema/Bug__c.Steps_to_Reproduce__c';
import FIELD_TITLE from '@salesforce/schema/Bug__c.Title__c';
import FIELD_WORKAROUND from '@salesforce/schema/Bug__c.Workaround__c';
import FIELD_PROJECT from '@salesforce/schema/Bug__c.Project__c';
import FIELD_BUGNUM from '@salesforce/schema/Bug__c.Bug_Number__c';

export default class BugRecordsEdit extends LightningElement {
    @track isCreateBugs = false;
    objectName = BUG_OBJECT;
    fields = [
                FIELD_PROJECT, FIELD_BUGNUM, FIELD_ASSIGNEDTO, FIELD_ID, FIELD_PRIORITY,
                FIELD_REPORTEDBY, FIELD_RESOLUTION, FIELD_SEVERITY, FIELD_STATUS, 
                FIELD_STEPS, FIELD_TITLE, FIELD_DESCRIPTION, FIELD_WORKAROUND, 
                FIELD_DATECREATED, FIELD_DATEUPDATED
            ];

    handleBugCreate(event){
        this.isCreateBugs = true;
    }
    connectedCallback(){
        this.fields[0].FIELD_BUGNUM = this.fields.FIELD_PROJECT + '_Bug_'+ this.fields.FIELD_ID;
        console.log('BUG NUMBER [DEBUG] :: '+this.fields[0].FIELD_BUGNUM);
    }
    handleSubmit(event){
        event.preventDefault();// stop the form from submitting 
        console.log('handle submit method', event.detail.fields);
        if(event.detail.fields.Project__c){
            const fields = event.detail.fields;
            this.template.querySelector('lightning-record-form').submit(fields);
            const response = JSON.stringify(fields);
            const lastModifiedDate = response.lastModifiedDate;
            console.log(lastModifiedDate);
            console.log('Record Created');
            // Create a new Date object to get the current date and time
            let currentDate = new Date();
            // Get the date and time in the format you want
            let date = currentDate.toLocaleDateString();
            let time = currentDate.toLocaleTimeString();  
            console.log('Date::: '+date +' Time::: '+time); 
        }else{
            const toastEvent = new ShowToastEvent({
                title: "Error!",
                message: "Please fill in all required fields.",
                variant: "error"            
            });
            this.dispatchEvent(toastEvent);
        }
    }
    successHandler(event){
        const recordId = event.detail.id;
        const fields = event.detail.fields;
        console.log('name@@ ',fields.Name.value);        
        console.log('record ID::: '+recordId);
        console.log('Event Details::: '+JSON.stringify(fields));
        const toastEvent = new ShowToastEvent({
            title: "New Bug is Created",
            message: "Title: "+ fields[FIELD_TITLE.fieldApiName].value,
            variant: "success"            
        });
        this.dispatchEvent(toastEvent);
    }
    // createBug(){
    //     const fields = {
    //         [NAME_FIELD.fieldApiName]: this.name,
    //         [DESCRIPTION_FIELD.fieldApiName]: this.description,
    //        // [BUG_ID_FIELD.fieldApiName]: this.bugId,
    //     };
        
    //     const recordInput = { apiName: BUG_OBJECT.objectApiName, fields };

    //     createRecord(recordInput)
    //         .then(result => {
    //             this.dispatchEvent(
    //                 new ShowToastEvent({
    //                     title: 'Success',
    //                     message: 'New Bug created',
    //                     variant: 'success',
    //                 }),
    //             );
    //         })
    //         .catch(error => {
    //             this.dispatchEvent(
    //                 new ShowToastEvent({
    //                     title: 'Error creating record',
    //                     message: error.body.message,
    //                     variant: 'error',
    //                 }),
    //             );
    //         });
    // }
    handleCancel(event){
        this.isCreateBugs = false;
    }

    handleCreateBugTab(){

    }
    handleError(event){
        var error = event.getParams();
        console.log("Error : " + JSON.stringify(error));
        //Get the error message
        //var errorMessage = event.getParam("message");
        console.log("Error Message : " + event.getParam("message"));
    }         
}