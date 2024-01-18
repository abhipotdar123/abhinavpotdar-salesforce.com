import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EditAccountRecordComponent extends LightningElement {
    @api recordId;
    @api objectApiName;
    @track darkMode = false;
    @track DisplayMode = "container lightMode";
    handleSuccess()
    {
        const successToast = new ShowToastEvent({
                                title: 'Success',
                                message : 'Record Updated Successfully.',
                                variant : 'success',
                                mode : 'dismissible'
                        });
        this.dispatchEvent(successToast);
    }
    handleToggle(event){
        this.darkMode = event.target.checked;
        if(this.darkMode){
            this.DisplayMode = "container dark";
        }
        else{
            this.DisplayMode = "container lightMode";
        }
    }
}