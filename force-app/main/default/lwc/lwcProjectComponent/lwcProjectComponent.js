import { LightningElement } from 'lwc';

export default class LwcProjectComponent extends LightningElement {
    connectedCallback() {
        const buttons = this.template.querySelectorAll('.button');
        const body = this.template.querySelector('body');
        console.log('buttons',buttons);
        buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            body.style.backgroundColor = event.target.id;
        }, false);
        });
    }
}