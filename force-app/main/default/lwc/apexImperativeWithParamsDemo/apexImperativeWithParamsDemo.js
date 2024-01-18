import { LightningElement } from 'lwc';
import findAccounts from '@salesforce/apex/AccountControllerLWC.findAccounts';

export default class ApexImperativeWithParamsDemo extends LightningElement {
    searchKey = '';
    accounts;
    timer;
    isLoading = false;
    searchHandler(event){
        window.clearTimeout(this.timer)
        this.searchKey = event.target.value;
        console.log('SEARCH KEY :: '+this.searchKey);
        this.timer = setTimeout(() => {
            this.callApex()
        }, 5000);  
        this.isLoading = true; 
    }
    callApex(){
        findAccounts({searchKey: this.searchKey})
        .then(result =>{
            this.accounts = result;
            console.log(this.accounts);
            this.isLoading = false;
        })
        .catch(error=>{
            console.error(error)
            this.isLoading = false;
        })
    }
}