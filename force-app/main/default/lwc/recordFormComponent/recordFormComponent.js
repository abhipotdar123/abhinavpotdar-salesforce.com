import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import references to salesfroce objects and fields from @salesforce/schema
import BUG_OBJECT from '@salesforce/schema/Bug__c';
import BUG_NAME from '@salesforce/schema/Bug__c.Name';
import FIELD_ASSIGNEDTO from '@salesforce/schema/Bug__c.Assigned_To__c';
import FIELD_ID from '@salesforce/schema/Bug__c.Bug_ID__c';
//import FIELD_LASTMODIFIEDBY from '@salesforce/schema/Bug__c.LastModifiedById'
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

export default class RecordFormComponent extends LightningElement {

    objectName = BUG_OBJECT;
    fields = [BUG_NAME, FIELD_ASSIGNEDTO, FIELD_ID, FIELD_PRIORITY,
        FIELD_REPORTEDBY, FIELD_RESOLUTION, FIELD_SEVERITY, FIELD_STATUS, FIELD_STEPS, FIELD_TITLE, FIELD_DESCRIPTION, FIELD_WORKAROUND, FIELD_DATECREATED, FIELD_DATEUPDATED];

            handleSubmit(event){
                event.preventDefault();       // stop the form from submitting 
                console.log('handle submit method', event.detail.fields);
                if(event.detail.fields.Name){
                    
                    const fields = event.detail.fields;
                    this.template.querySelector('lightning-record-form').submit(fields);
                }else{
                     alert('missing required field');
                    // return;
                }
                //const fields = event.detail.fieldList;
                    //this.template.querySelector('lightning-record-form').submit(fields);
                /*let nameReqField = event.detail.fields.Name.value;
                */
            }

    successHandler(event){
        const recordId = event.detail.id;
        const fields = event.detail.fields;
        
        console.log('name@@ ',fields.Name.value);        
        // // Extract the date and time from the LastModifiedBy field
        // const lastModifiedBy = fields[FIELD_LASTMODIFIEDBY.fieldApiName].value;
        // const dateAndTime = lastModifiedBy.split(', ')[1];
        // const date = new Date(dateAndTime);
        // const dateUpdated = date.toISOString();
        // console.log('DATE UPDATED::: '+dateUpdated);
        // // Update the Date Updated field with the extracted date and time
        // fields[FIELD_DATEUPDATED.fieldApiName] = { value: dateUpdated };
        
        console.log('record ID::: '+recordId);
        console.log('Event Details::: '+JSON.stringify(fields));
        const toastEvent = new ShowToastEvent({
            title: "New Bug is Created",
            message: "Title: "+ fields[FIELD_TITLE.fieldApiName].value,
            variant: "success"            
        });
        this.dispatchEvent(toastEvent);
    }        

}