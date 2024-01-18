import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class ObjectLimitsComponent extends LightningElement {
    selectedObjectName = 'Account'; // Replace with your logic to get the selected object name

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    // Handle any errors from the LDS wire
    handleError(error) {
        console.error('Error retrieving object information: ', error);
    }

    // Get the object limits and field limits information from the LDS wire response
    get objectLimits() {
        if (this.objectInfo.data) {
            const objectInfoData = this.objectInfo.data;
            return {
                objectLimit: objectInfoData.limitInfo.limit,
                fieldLimit: objectInfoData.limitInfo.fields,
            };
        }
        return null;
    }
}