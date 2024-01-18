import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ShowRecordDetailsComponent extends LightningElement {

    @api recordId;
    @api objectApiName;

    handleSuccess(){
        const showSuccessToast = new ShowToastEvent({
            title : 'Success',
            message : 'Record Updated Successfully', 
            mode : 'dismissible',
            variant : 'success'
        });
        this.dispatchEvent(showSuccessToast);
    }
}