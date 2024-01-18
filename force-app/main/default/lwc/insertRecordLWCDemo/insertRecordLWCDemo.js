import { LightningElement, track, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import insertAcc from '@salesforce/apex/AccountInsert.insertAcc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJINFO from '@salesforce/schema/Account';
import RATING  from '@salesforce/schema/Account.Rating';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
export default class InsertRecordLWCDemo extends LightningElement {
    toggleAccordionLabel = 'Collapse All';
    activeSections = ['A', 'B'];
    Name;
    AccountNumber;
    rating;
    industry;
    @track account ={};
    @track ratingPicklistOptions;
    @track industryPicklistOptions;
    @track spinnerStatus =false;
    @wire( getObjectInfo ,{
        objectApiName:ACCOUNT_OBJINFO
    })
    accountInfo
    @wire(getPicklistValues,{
        recordTypeId: '$accountInfo.data.defaultRecordTypeId',
        fieldApiName: INDUSTRY_FIELD
    })
    industryPicklist(
        {
            error,
            data
        }){
            if(data){
                this.industryPicklistOptions = data.values;
            }else if(error){
        }
    }
    handleindustry(event){
        this.industry = event.target.value;
        this.account.industry= this.industry;
    }   
    @wire(getPicklistValues,{
        recordTypeId: '$accountInfo.data.defaultRecordTypeId',
         fieldApiName: RATING
    })
    ratingPicklist({data,error}){
        if(data){
            this.ratingPicklistOptions=data.values;
        }else if(error){

        }
    }
    handleRating(event){
        this.account.rating=event.target.value;

    }
    handlername(event){
        this.Name = event.target.value;
        console.log(this.Name)
        this.account.Name=this.Name;
    }
    handleAccountNumber(event){
        this.AccountNumber = event.target.value;
        console.log(this.AccountNumber)
        this.account.AccountNumber=this.AccountNumber;
    }
    toastEventFire(title,msg,variant,mode){
        const e = new ShowToastEvent({
            title: title,
            message: msg,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(e);
    }        
    handleForSave(){
        this.spinnerStatus = true;
        alert(JSON.stringify(this.account));
        insertAcc({ acc : this.account})
        .then(result =>{
            this.spinnerStatus = false;
            this.Name='';
            this.AccountNumber='';
            this.rating='';
            this.industry='';
            this.toastEventFire('Success','account Record is Saved','success')                      
        })
        .catch(error =>{
            this.error = error.message;
            alert(JSON.stringify(error))
        })
    }
    toggleAccordion(event) {        
        if (this.activeSections.length > 0) {
            this.activeSections = [];
            this.toggleAccordionLabel = 'Expand All';
        } else {
            this.activeSections = ['A', 'B'];
            this.toggleAccordionLabel = 'Collapse All';
        }
    }
}