public with sharing class AccountTriggerController {
    public AccountTriggerController() {
    }

    public static void afterInsert(List<Account> lstAccounts) {
        List<Contact> lstContacts = new List<Contact>();

        for (Account acc : lstAccounts) {
            Contact con = new Contact();
            con.LastName = acc.Name + ' Contact';
            con.AccountId = acc.Id;
            lstContacts.add(con);
        }

        if (!lstContacts.isEmpty()) {
            try {
                insert lstContacts;
            } catch (Exception e) {
                // Print the exception message
                System.debug('Exception Message: ' + e.getMessage());
            }
        }
    }

    public static void beforeDelete(List<Account> lstAccounts) {
        for(Account acc: lstAccounts){
            if(acc.Active__c == 'Yes'){
                acc.addError('You can not delete this Account, As this Account still active');
            }
        }
    }
}