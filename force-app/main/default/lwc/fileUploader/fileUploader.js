import { LightningElement, wire } from 'lwc';
import getAllObjects from '@salesforce/apex/metaDataController.getAllObjects';

export default class FileUploader extends LightningElement {
    isFirst = true;
    selectedObject = '';
    picklistOptions = [];
    acceptedFormats = ['.pdf', '.png', '.jpg', '.jpeg']; // Add your desired file formats here
    myRecordId = null; // Provide the record ID here if you want to associate the file with a specific record

    // Get all the information of Objects present in org
    @wire(getAllObjects)
    getObjectNames({ data, error }) {
        if (data) {
            this.objectNames = data;
            // Populate the picklist options with all object names, sorted alphabetically
            this.picklistOptions = data
                .map((objectName) => ({
                    label: objectName,
                    value: objectName,
                }))
                .sort((a, b) => a.label.localeCompare(b.label));
        } else if (error) {
            console.error(error);
        }
    }

    handleObjectSelection(event) {
        const selectedObject = event.detail.value;
        this.selectedObject = selectedObject;
        this.iconName = "standard:" + selectedObject;
        this.labels = "Selected Object: " + selectedObject;
        console.log('Selected Object:', selectedObject);
        this.isFirst = false;
        this.isLoading = true;
        this.currentStep = 'step2';
        this.isFields = true;
    }

    handleUploadFinished(event) {
        // Get the uploaded files information
        const uploadedFiles = event.detail.files;
        // Handle further logic (e.g., display the file names, save the files to a custom object, etc.)
        console.log('Uploaded Files:', uploadedFiles);
    }
}