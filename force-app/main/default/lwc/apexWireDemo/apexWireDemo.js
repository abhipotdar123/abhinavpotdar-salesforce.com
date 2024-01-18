import { LightningElement, wire} from 'lwc';
import getAccountLists from '@salesforce/apex/AccountControllerLWC.getAccountList';
export default class ApexWireDemo extends LightningElement {
    @wire(getAccountLists)
    accounts

    accountList
    @wire(getAccountLists)
    accountsHandler({data, error}){
        if(data){
            this.accountList = data.map(item=>{
                let newType = item.Type === 'Customer - Channel' ? 'Channel' : 
                (item.Type === 'Customer - Direct' ? 'Direct' : '-------------')
                return {...item, newType}
                //meaning of return {...item, newType} is keep another information as it is just modify the newType
            })
        }
        else{
            console.error(error);
        }
    }
}