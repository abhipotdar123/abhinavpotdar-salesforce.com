import { LightningElement } from 'lwc';

export default class MyComponent extends LightningElement {
    connectedCallback() {
        // This is an IIFE
        (function() {
            // Your private code goes here
            let privateVar = 'This is private';
            console.log(privateVar);
        })();
    }
}