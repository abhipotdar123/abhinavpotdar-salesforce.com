// bugRecordsEditForm.js
import { LightningElement } from 'lwc';
import createBugRecord from '@salesforce/apex/BugRecordsEditController.createBugRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BugRecordsEditForm extends LightningElement {
    handleSubmit(event) {
        event.preventDefault(); // Prevent form submission

        // Get field values from form
        const fields = event.detail.fields;

        createBugRecord(fields)
            .then(() => {
                // Show success toast
                const toastEvent = new ShowToastEvent({
                    title: 'Success',
                    message: 'Bug record created successfully',
                    variant: 'success'
                });
                this.dispatchEvent(toastEvent);

                // Reset form
                this.template.querySelector('lightning-record-edit-form').reset();
            })
            .catch(error => {
                // Show error toast
                const toastEvent = new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                });
                this.dispatchEvent(toastEvent);
            });
    }
}