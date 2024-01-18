public with sharing class RelatedRecordsController {
    public RelatedRecordsController() {

    }
    @AuraEnabled(cacheable=true)
    public static User getloggedUser() {
        User users = [SELECT Id, Name, Email,AvatarUrl__c, CommunityNickname, Address FROM User WHERE Id = :UserInfo.getUserId()];
        system.debug('Users: '+users);
        return users;
    }
    @AuraEnabled(cacheable=true)
    public static List<sObject> getAllAccountRecords(){
        Return[SELECT Id, Name, AccountNumber, AnnualRevenue, BillingAddress, Industry, Rating, Type, CreatedDate FROM Account WHERE CreatedDate >= LAST_N_MONTHS:6 ORDER BY CreatedDate DESC];
    }
    @AuraEnabled(cacheable=true)
    public static List<sObject> getAllRelatedContacts(String AccountIds){
        List<Contact> contacts = New List<Contact>();
        contacts = [SELECT Name, AccountId, CreatedDate, EmailBouncedDate, Email, LeadSource
                    FROM Contact WHERE AccountId=:AccountIds];
        Return contacts;
    }
}