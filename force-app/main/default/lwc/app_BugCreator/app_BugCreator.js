import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import BUG_OBJECT from '@salesforce/schema/Bug__c';
import FIELD_PROJECT from '@salesforce/schema/Bug__c.Project__c';
import FIELD_BUG_NAME from '@salesforce/schema/Bug__c.Name';
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
import FIELD_BUGID from '@salesforce/schema/Bug__c.Bugs_ID__c';

export default class App_BugCreator extends LightningElement {
    @api recordId;
    @api objectApiName = BUG_OBJECT;
    fields = [
        FIELD_BUG_NAME,
        FIELD_BUGID,
        FIELD_ASSIGNEDTO,
        FIELD_ID,
        FIELD_PROJECT,
        FIELD_DATECREATED,
        FIELD_DATEUPDATED,
        FIELD_DESCRIPTION,
        FIELD_PRIORITY,
        FIELD_REPORTEDBY,
        FIELD_RESOLUTION,
        FIELD_SEVERITY,
        FIELD_STATUS,
        FIELD_STEPS,
        FIELD_TITLE,
        FIELD_WORKAROUND
    ];

    handleSuccess(event) {
        event.preventDefault(); // stop the form from submitting
        const fields = event.detail.fields;
        const autoNumberValue = fields.Bug_ID__c.value; // Assuming Bug_ID__c is the auto number field
        const projectTitle = fields.Project__c;
        console.log('autoNumberValue'+autoNumberValue);
        console.log('projectTitle'+projectTitle);
        // Remove the "BUG-" prefix from the auto number value
        const bugId = autoNumberValue.replace('BUG', '');
        fields.Bugs_ID__c = projectTitle + bugId;
        console.log('bugId :: [DEBUG]'+fields.Bugs_ID__c.value);
        // Check if the Project__c field is empty
        if (!fields.Project__c) {
            console.error('Project field is empty'); // Print an error message in the console
            return; // Stop the execution of the method
        }
        
        const evt = new ShowToastEvent({
            title: 'New Bug is created',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success'
        });
        this.dispatchEvent(evt);
    }
}