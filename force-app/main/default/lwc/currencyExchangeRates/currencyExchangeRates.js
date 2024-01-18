// currencyExchangeRates.js
import { LightningElement, track, wire, api } from 'lwc';
import getExchangeRates from '@salesforce/apex/CurrencyExchangeRatesController.getExchangeRates';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CurrencyExchangeRates extends LightningElement {
    @track error;
    @track conversionRate;
    @track CurrencyOptions = [
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        { label: 'GBP', value: 'GBP' },
        { label: 'JPY', value: 'JPY' },
        { label: 'INR', value: 'INR' },
        { label: 'PKR', value: 'PKR' }
    ];

    @api fromCurrency ;
    @api toCurrency ;
    @track amount;
    @track convertedAmount;

    handleFromCurrencyChange(event) {
        this.fromCurrency = event.detail.value;
    }

    handleToCurrencyChange(event) {
        this.toCurrency = event.detail.value;
    }

    handleAmountChange(event) {
        this.amount = event.detail.value;
        console.log('Amount ::'+this.amount);
    }

    handleSubmit() {
        try {
            getExchangeRates({
                fromcurrencies: this.fromCurrency,
                tocurrencies: this.toCurrency
            })
            .then(result => {
                // Parse the response body to get the conversion rate value
                const responseBody = JSON.parse(result);
                this.conversionRate = responseBody;
                console.log('[ConversionRate] :: '+this.conversionRate);
                const event = new ShowToastEvent({
                    title: 'Successful',
                    message: 'Result Displayed',
                    variant: 'success'
                });
                this.dispatchEvent(event);
                console.log('Successful');
            })
            .catch(error => {
                const event = new ShowToastEvent({
                    title: 'Error',
                    message: 'Error creating contact. Please Contact System Admin',
                    variant: 'error'
                });
                this.dispatchEvent(event);
            });
            console.log('[CONDITION CHECK] :: '+(this.amount && this.conversionRate));
            // Calculate the converted amount
            if (this.amount && this.conversionRate) {
                this.convertedAmount = this.amount * this.conversionRate;
                console.log('[Total Amount] :: '+this.convertedAmount);
            }
        } catch (error) {
            const event = new ShowToastEvent({
                title: 'Error',
                message: 'Error processing the request. Please Contact System Admin',
                variant: 'error'
            });
            this.dispatchEvent(event);
        }
    }        
}