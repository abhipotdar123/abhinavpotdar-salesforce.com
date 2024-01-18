import { LightningElement } from 'lwc';

export default class ColorChanger extends LightningElement {
    connectedCallback() {
        // Query all the button
        const buttons = this.template.querySelectorAll('.button');
    
        // we want to change the background colour of body so query body first
        const body = this.template.querySelector('body');
    
        buttons.forEach(function (button) {
          button.addEventListener('click', function (event) {
            body.style.backgroundColor = event.target.id;
          }, false);
        });
    }
}