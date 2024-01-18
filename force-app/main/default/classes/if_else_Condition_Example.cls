public with sharing class if_else_Condition_Example {
    public if_else_Condition_Example() {

    }

    public static void mathematicalExample(Integer firstNumber, Integer secondNumber){
        integer total;
        
		system.debug('first Number: '+firstNumber);
        system.debug('Second Number: '+secondNumber);
        total = firstNumber + secondNumber;
        system.debug('addition is ...:'+ Total);

        total = firstNumber - secondNumber;
        system.debug('substraction is ...:'+ Total);
       
        total = firstNumber * secondNumber;
        system.debug('multiplication is ...:'+ Total);

        if (secondNumber != 2500) 
        { 
            decimal decFirstNumber = decimal.valueOf(firstNumber);
            decimal decsecondNumber = decimal.valueOf(secondNumber);
            decimal dectotal = (decFirstNumber / decsecondNumber).setScale(4);
            system.debug('divison is ...:'+ dectotal);
        }
    }
    
}