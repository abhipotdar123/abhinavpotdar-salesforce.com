public with sharing class AccountTriggerController {
    public AccountTriggerController() {
    }

    public static void beforeDelete(List<Account> lstAccounts) {
        for(Account acc: lstAccounts){
            if(acc.Active__c == 'Yes'){
                acc.addError('You can not delete this Account, As this Account still active');
            }
        }
    }
}