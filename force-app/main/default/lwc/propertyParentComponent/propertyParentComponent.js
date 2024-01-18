import { LightningElement, track } from 'lwc';

export default class PropertyParentComponent extends LightningElement {
    @track parentComponentValue='Value has been Assigned from JavaScript';

    handleOnClick(){
        this.parentComponentValue = 'Value has been Assigned from Button Click.';
    }

    callCustomMessage(){
        var invokeCustomMessage = this.template.querySelector('c-property-child-component');
        invokeCustomMessage.showCustomMessage();
    }

    callCustomerDetails(){
        var invokeCustomDetails = this.template.querySelector('c-property-child-component');
        var params = {'FirstName':'Abhinav', 'LastName':'Potdar'};
        invokeCustomDetails.showCustomerDetails(params);
    }
}