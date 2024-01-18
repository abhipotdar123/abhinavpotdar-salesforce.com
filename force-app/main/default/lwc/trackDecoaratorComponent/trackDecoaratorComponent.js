import { LightningElement, track } from 'lwc';

export default class TrackDecoaratorComponent extends LightningElement {
    @track customMessage = 'Private Reactive Property';

    handleOnChange(event){
        //this.customMessage = 'Reactive Property Value has been Changed.';
        this.customMessage = event.target.value;
    }
}