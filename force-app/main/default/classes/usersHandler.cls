public with sharing class usersHandler {
    public usersHandler() {

    }
    @AuraEnabled(cacheable=true scope='global')
    public static User getLoggedInUser(){
        return[
            SELECT Id,Name,Email FROM User 
            WHERE Id=:userinfo.getuserId()
        ];
    }

    @AuraEnabled(cacheable=true scope='global')
    public static User__c[] getAllUsers(){
        return[
            SELECT Contact_Number__c, Email__c, Id, Name, Timezone__c, Gender__c, City__c, Skills__c
            FROM User__c 
            WITH SECURITY_ENFORCED
            ORDER BY Name
            LIMIT 50
        ];
    }

    @AuraEnabled(cacheable=true scope='global')
    public static User__c[] getUser(Id recordId) {
        return [SELECT Id, Name, Email__c, Contact_Number__c, Timezone__c, Gender__c, City__c, Skills__c FROM User__c WHERE Id = :recordId];
    }
}