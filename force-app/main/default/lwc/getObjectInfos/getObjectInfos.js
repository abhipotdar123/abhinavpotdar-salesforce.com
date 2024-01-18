import { LightningElement, wire } from 'lwc';
import { getObjectInfos } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';

export default class GetObjectInfos extends LightningElement {
    objectApiNames = [ACCOUNT_OBJECT, OPPORTUNITY_OBJECT];
    concatenatedApiNames = this.objectApiNames.join();
    objectInfos;

    @wire(getObjectInfos, {objectApiName: '$concatenatedApiNames' })
    objectInfoHandler({data, error}){
        if(data){
            console.log(data);
            this.objectInfos = data;
        }
        if(error){
            console.log(error);
        }
    }
}