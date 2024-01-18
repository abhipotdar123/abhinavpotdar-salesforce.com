import { LightningElement, wire, api } from 'lwc';
import SearchAccountByName from '@salesforce/apex/AccountRecordsController.searchAccountByName';

export default class SearchAccountsComponent extends LightningElement {
    @api searchText;
    @api accountRecordsList;

    onHandleChange(event){
        this.searchText = event.target.value;
        console.log('Searched Text: ',this.searchText);
    }

    getAccountsList(){
        SearchAccountByName({startingChars: this.searchText})
            .then(result =>{
                this.accountRecordsList = result;
                console.log('Account Record List',this.accountRecordsList);
            })
            .catch(error => {
                console.log('ERROR OCCURED: '+error);
            });
    }

}