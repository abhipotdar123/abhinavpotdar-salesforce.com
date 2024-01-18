import { LightningElement } from 'lwc';

export default class HtmlEventsComponent extends LightningElement {
    
    searchText = 'Ram Kumar';
    
    handleOnChange() {
        alert('Search text is changed');
    }

    handleOnClick(){
        console.log('You have clicked on Click Me Button');
    }

    getButtonDetails(event){
        const buttonLabel = event.target.label;
        const buttonName = event.target.name;
        console.log('Button Label: '+buttonLabel);
        console.log('Button Name : '+buttonName);
    }
}