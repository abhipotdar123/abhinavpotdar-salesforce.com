import { LightningElement, track, api } from 'lwc';

export default class ChildComponent extends LightningElement {
    @track customerName = 'Ram Kumar';
    @api productName = 'Washing Machine';
    employeeName = 'Sampath Kumar';

    handleOnclick()
    {
        this.customerName = 'Customer Name has been Changed';
        this.productName = 'Product Name has been Changed.';
        this.employeeName = 'Employee Name has been Changed.';
    }
}