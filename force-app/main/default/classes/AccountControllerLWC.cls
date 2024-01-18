public with sharing class AccountControllerLWC {
    public AccountControllerLWC() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList (){
        try {
            return[SELECT Id, Name, Type, Industry FROM Account LIMIT 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> filterByAccountType(String AccountType){
        try {
            return[SELECT Id, Name, Type, Industry FROM Account WHERE Type =: AccountType LIMIT 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    // for apexImperativeWithParamsDemo
    @AuraEnabled
    public static List<Account> findAccounts(String searchKey){
        try {
            String key = '%' + searchKey +'%';
            return[SELECT Id, Name, Type, Industry FROM Account WHERE Name LIKE: key LIMIT 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}