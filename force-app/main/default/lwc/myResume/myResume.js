import { LightningElement, track } from 'lwc';
import myBackground from '@salesforce/resourceUrl/myBackground';
import myBackground2 from '@salesforce/resourceUrl/myBackground2';
import salesforceLogo from '@salesforce/resourceUrl/SalesforceLogo';
import heartLogo from '@salesforce/resourceUrl/SalesforceHeartLogo';
import trailheadLogo from '@salesforce/resourceUrl/trailheadLogo';
import MY_RESUME from '@salesforce/resourceUrl/myResume_PDF';
import SCROLL_DOWN from '@salesforce/resourceUrl/Scroll_Down';
import SCROLL_UP from '@salesforce/resourceUrl/Scroll_Up';

const words = ["#salesforceDeveloper", "#coder", "#blogger", "#trailheadRanger"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

export default class MyResume extends LightningElement {
    @track isHomePage = false;
    downloadResumeInterval;
    buttonLabel = 'Download CV';
    resumeDownload = false;

    bgImage = myBackground;
    bgImage2 = myBackground2;
    sfdcLogo = salesforceLogo;
    sfdcHeart = heartLogo;
    trailLogo = trailheadLogo;
    scrollButton = SCROLL_DOWN;
    @track isDown = true;
    @track isUp = false;
    connectedCallback() {
        const header = this.template.querySelector('.header');
    }

    renderedCallback() {
        this.typeEffect();
    }

    typeEffect() {
        if (!this.resumeDownload) {
            const dynamicText = this.template.querySelector('.dynamic_text');
            const currentWord = words[wordIndex];
            const currentChar = currentWord.substring(0, charIndex);

            dynamicText.textContent = currentChar;

            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                setTimeout(() => this.typeEffect(), 200);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(() => this.typeEffect(), 100);
            } else {
                isDeleting = !isDeleting;
                wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
                setTimeout(() => this.typeEffect(), 1200);
            }
        }
    }

    handleDownloadResume() {
        if (!this.resumeDownload) {
            this.resumeDownload = true;
            this.buttonLabel = "Your file is Downloading...";
            this.clearDownloadResumeInterval();
            this.downloadResumeInterval = setInterval(() => {
                clearInterval(this.downloadResumeInterval);
                this.buttonLabel = "Download CV";
            }, 5000);

            // Simulate a download delay (replace with your actual download logic)
            this.waitingForDownload = setTimeout(() => {
                this.resumeDownload = false;
                this.typeEffect(); // Restart the typing animation
                this.downloadResume();
            }, 5000);
        }
    }

    clearDownloadResumeInterval() {
        clearInterval(this.downloadResumeInterval);
        clearTimeout(this.waitingForDownload);
    }

    downloadResume() {
        const downloadLink = document.createElement('a');
        downloadLink.href = MY_RESUME;
        downloadLink.download = "myResume.pdf";
        downloadLink.click();
    }

    handleScrollToTimeZoneProject() {
        const timeZoneProjectElement = this.template.querySelector('.TimeZone_Project_Container');

        if (timeZoneProjectElement) {
            timeZoneProjectElement.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error('The .TimeZone_Project element is not present on the page.');
        }
    }
    isProject= true;

    //Scroll to About Me Section
    handleScrollToAboutMe() {
        const aboutMeDiv = this.template.querySelector('[data-id="aboutMe_div"]');
        aboutMeDiv.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    } 

    // Scroll to Home Page section
    handleScrollToHome() {
        const homePageDiv = this.template.querySelector('[data-id="homePage_div"]');
        homePageDiv.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }

}