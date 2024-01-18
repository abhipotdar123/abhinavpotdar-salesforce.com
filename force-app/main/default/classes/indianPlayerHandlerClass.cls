public with sharing class indianPlayerHandlerClass {
    public indianPlayerHandlerClass() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Player__c> getAllPlayerInfo(string playerName){
        try {
            System.debug('Player Name: ' + playerName);
            List<Player__c> player = new List<Player__c>();
            player = [SELECT Against__c, Century_No__c, CreatedById, CreatedDate, Id, Image_URL__c, IsDeleted, 
                        LastActivityDate, LastModifiedById, LastModifiedDate, LastReferencedDate, LastViewedDate, 
                        Match_Date__c, Match_Result__c, Name, OwnerId, Position__c, Runs__c, Strick_Rate__c, SystemModstamp, 
                        Type_of_Venue__c, Venue__c, isNotOut__c
                        FROM Player__c
                        WHERE Name=:playerName
                     	ORDER BY Century_No__c ASC];
            return player;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}