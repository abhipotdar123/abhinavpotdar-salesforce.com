import { LightningElement, api } from 'lwc';

export default class PropertyChildComponent extends LightningElement {
    @api childProperty = 'Child Component Property';

    @api showCustomMessage()
    {
        alert('Child Component Non Paramterized Method Fired.');
    }

    @api showCustomerDetails(customerNameParam)
    {
        alert('Customer Name is....: '+ customerNameParam.FirstName + ' '+ customerNameParam.LastName);
    }
}