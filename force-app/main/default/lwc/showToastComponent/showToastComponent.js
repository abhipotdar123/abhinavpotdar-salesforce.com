import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class ShowToastComponent extends LightningElement {
    showSuccessToast() {
        const successMessage = new ShowToastEvent({
            title: 'Success',
            message: 'Operation Completed Successfully',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(successMessage);
    }

    showErrorToast() {
        const errorToast = new ShowToastEvent({
            title: 'Error',
            message: 'Operation has been Failed..!! Errors Occured.',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(errorToast);
    }

    showWarningToast() {
        const warningToast = new ShowToastEvent({
            title: 'Warning',
            message: 'Please Enter the Values for the Required Fields.',
            variant: 'warning',
            mode: 'dismissable'
        });
        this.dispatchEvent(warningToast);
    }

    showInfoToast() {
        const infoToast = new ShowToastEvent({
            title: 'Information',
            message: 'Please Review the Documents.',
            variant: 'info',
            mode: 'dismissable'
        });
        this.dispatchEvent(infoToast);
    }
}