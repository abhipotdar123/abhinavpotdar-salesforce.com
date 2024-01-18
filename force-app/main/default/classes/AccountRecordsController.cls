public with sharing class AccountRecordsController {  
    @AuraEnabled(Cacheable = true)
    public static List<Account> GetAllAccountRecords(){
        try {
            List<Account> lstAccounts = [SELECT id, name, rating, industry, annualrevenue, phone, fax
                                    	FROM Account LIMIT 10];
            return lstAccounts;
        } catch (Exception e) {
            system.debug('exception: '+e.getMessage());
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(Cacheable = true)
    public static List<Account> searchAccountByName(string startingChars){
        try {
            List<Account> lstAccounts = [SELECT id, name, rating, industry, annualrevenue, phone, fax
                                    	FROM Account WHERE Name LIKE : startingChars + '%' LIMIT 5];
            return lstAccounts;
        } catch (Exception e) {
            system.debug('exception: '+e.getMessage());
            throw new AuraHandledException(e.getMessage());
        }
    }
}