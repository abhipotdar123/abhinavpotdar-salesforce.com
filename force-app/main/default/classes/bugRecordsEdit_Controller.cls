public with sharing class bugRecordsEdit_Controller {
    public bugRecordsEdit_Controller() {

    }
    @AuraEnabled
    public static void insertBugRecord(Bug__c bugs){
        try {
            insert bugs;
            system.debug('Bug Record [DEBUG]:: '+bugs);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}