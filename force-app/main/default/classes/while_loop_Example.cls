public with sharing class while_loop_Example {
    public while_loop_Example() {

    }
    public static void while_loop(integer maxNumber,integer counter){
      
        while(counter<=10){
           
            system.debug( maxNumber+'*' +counter+ '=' +( maxNumber*counter ));
            counter ++;
        }
    }
}