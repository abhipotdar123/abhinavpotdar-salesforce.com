import { LightningElement } from 'lwc';
import viratResource from '@salesforce/resourceUrl/virat';

export default class Html_poc extends LightningElement {
    imageUrl = '';

    handleAddImage() {
        this.imageUrl = '/ODI_1.png';
        this.styleCard = viratResource + this.imageUrl;
        console.log('ImageURL ' + this.styleCard);

        const myDiv = this.template.querySelector('.slds-card__grid');
        if (myDiv) {
            // const img = new Image();
            // img.src = this.styleCard;
            // myDiv.appendChild(img);
            divs = '<div class="slds-card slds-card_narrow slds-card_focus"><div class="slds-card__header slds-card__header_border-bottom"><div class="slds-card__title"><div class="slds-truncate"><a href="#">Card 1</a></div></div></div><div class="slds-card__body"><p>This is the content of the first card.</p></div></div></div>'
            myDiv.innerHTML = divs;
        }
    }
}