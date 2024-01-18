import { LightningElement, track } from 'lwc';
const words = ["Salesforce Developer", "Coder", "Blogger", "Trailhead Ranger"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

export default class MyWebsite extends LightningElement {
    @track toggle_Value;
    @track darkMode = false;
    @track DisplayMode = "main_container light_Mode_Background";
    @track logo_Text = "logoText";
    @track footer_Background = "new_footer_area_Light";
    @track projectOpen = false;
    @track fullUrl = '';

    handleToggle(event) {
        this.darkMode = event.target.checked;
        if (this.darkMode) {
            this.DisplayMode = "main_container dark_Mode_Background";
            this.logo_Text = "logoText_Light";
            this.footer_Background = "new_footer_area_Dark";
        } else {
            this.DisplayMode = "main_container light_Mode_Background";
            this.logo_Text = "logoText";
            this.footer_Background = "new_footer_area_Light";
        }
    }

    connectedCallback() {
        // JavaScript code for the typing effect
        const header = this.template.querySelector('.header');
    }

    renderedCallback() {
        const dynamicText = this.template.querySelector('.dynamic_text');

        const typeEffect = () => {
            const currentWord = words[wordIndex];
            const currentChar = currentWord.substring(0, charIndex);

            dynamicText.textContent = currentChar;

            if (!isDeleting && charIndex < currentWord.length) {
                // If condition is true, type the next character
                charIndex++;
                setTimeout(typeEffect, 200);
            } else if (isDeleting && charIndex > 0) {
                // If condition is true, remove the previous character
                charIndex--;
                setTimeout(typeEffect, 100);
            } else {
                // If word is deleted then switch to the next word
                isDeleting = !isDeleting;
                wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
                setTimeout(typeEffect, 1200);
            }
        };

        typeEffect();


    }

    handleProjectClick(event) {
        // Open the link in the showCase div
        this.projectOpen = true;
        this.fullUrl = 'https://abhinavindia-dev-ed.develop.lightning.force.com/c/resume_Abhinav.app';
        console.log('Url: '+this.fullUrl);
    }
}