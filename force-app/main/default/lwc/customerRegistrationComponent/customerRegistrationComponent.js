import { LightningElement } from 'lwc';

export default class CustomerRegistrationComponent extends LightningElement {
    countryNames = [
        {value:'IND', label:'Bharat'},
        {value:'PAK', label:'Pakistan'},
        {value:'USA', label:'United States of America'},
        {value:'CHN', label:'China'},
        {value:'GRM', label:'Germany'},
        {value:'JPN', label:'Japan'},
        {value:'ME', label:'Middle East'},
        {value:'UK', label:'United Kingdom'},
        {value:'AUS', label:'Australia'}
    ];

    selectedCountryName = 'IND';
    // console.log('Selected Country is: '+selectedCountryName);
}