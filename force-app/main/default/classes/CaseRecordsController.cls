public with sharing class CaseRecordsController {
    public CaseRecordsController() {

    }

    @AuraEnabled(cacheable = true)
    public static List<Case> SearchCasesByStatus(string caseRecordStatus){
        try {
            List<case> lstCases = new List<case>();
            lstCases = [SELECT Id, CaseNumber, Priority, Type, Origin, Reason, Subject , Status
                        FROM Case
                        WHERE Status =: caseRecordStatus];
            
            return lstCases;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}