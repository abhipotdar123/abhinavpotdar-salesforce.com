public with sharing class BugRecordsEditController {
    @AuraEnabled
    public static void createBugRecord(String project, String assignedTo, String priority, String reportedBy, String resolution,
        String severity, String status, String steps, String title, String description, String workaround, String bugNum) {
        try {
            Bug__c bug = new Bug__c();
            bug.Project__c = project;
            bug.Assigned_To__c = assignedTo;
            bug.Priority__c = priority;
            bug.Reported_By__c = reportedBy;
            bug.Resolution__c = resolution;
            bug.Severity__c = severity;
            bug.Status__c = status;
            bug.Steps_to_Reproduce__c = steps;
            bug.Title__c = title;
            bug.Description__c = description;
            bug.Workaround__c = workaround;
            bug.Bug_Number__c = bugNum;

            insert bug;

            // Optionally, you can return the created bug record to the Lightning component
            // by returning it as a result, e.g.:
            // return bug;

        } catch (Exception e) {
            // Handle any exceptions or errors here
            System.debug('Error creating bug record: ' + e.getMessage());
            throw new AuraHandledException('Error creating bug record: ' + e.getMessage());
        }
    }
}