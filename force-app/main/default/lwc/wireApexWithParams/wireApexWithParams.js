import { LightningElement, wire } from 'lwc';
import filterByAccountType from '@salesforce/apex/AccountControllerLWC.filterByAccountType';

export default class WireApexWithParams extends LightningElement {
    selectedType = '';

    @wire(filterByAccountType, {AccountType:'$selectedType'})
    filteredAccounts

    get typeOptions(){
        return [
            {label: "None" , value: ""},
            {label: "Customer - Channel" , value: "Customer - Channel"},
            {label: "Customer - Direct" , value: "Customer - Direct"}            
        ]
    }
    typeHandler(event){
        this.selectedType = event.target.value;
        console.log('Selected Type :: '+this.selectedType);
    }
}