import { LightningElement } from 'lwc';

export default class BasicCalculatorComponent extends LightningElement {

    firstNumber;
    secondNumber;
    operationResult;

    handleOnChange(event){
        const elementName = event.target.name;
        const elementValue = event.target.value;
        
        if(elementName === 'firstNumber'){
            this.firstNumber = elementValue;
        }
        else{
            this.secondNumber =  elementValue;            
        }
    }

    doAddition(){
        this.operationResult = parseInt(this.firstNumber) + parseInt(this.secondNumber);
    }

    doSubtraction(){
        this.operationResult = parseInt(this.firstNumber) - parseInt(this.secondNumber);
    }

    doMultiplication(){
        this.operationResult = parseInt(this.firstNumber) * parseInt(this.secondNumber);
    }

    doDivision(){
        if(this.secondNumber !== '0'){
            this.operationResult = parseInt(this.firstNumber) / parseInt(this.secondNumber);
        }
        else{
            alert('Please give the second value greater than 0 or else result will be Infinity');
        }
    }
    doModulus()
    {
        this.operationResult = parseInt(this.firstNumber) % parseInt(this.secondNumber);
    }
}