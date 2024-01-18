global class updateUserDetails_batchJob implements Database.Batchable<sObject> {
    private Integer processedRecordCount;
    private String userEmailAddress;

    global updateUserDetails_batchJob() {
        this.processedRecordCount = 0;
        String loggedInUserEmail = UserInfo.getUserEmail();
        System.debug('Logged-in user email: ' + loggedInUserEmail);
        this.userEmailAddress = loggedInUserEmail;
    }

    global Database.QueryLocator start(Database.BatchableContext BC) {
        // Query for active users with specific profile IDs
        String query = 'SELECT Email__c, Industry, Phone__c, Website, Name FROM Account';
        return Database.getQueryLocator(query);
    }

    global void execute(Database.BatchableContext BC, List<sObject> scope) {
        List<Account> accountList = new List<Account>();

        // Loop through the queried user records
        for (sObject obj : scope) {
            Account acc = (Account)obj;

            // Update the desired fields for each user
            acc.Email__c = 'test@convera142354.com';
            acc.Phone__c = '123456789046464';
            acc.Website = 'www.test.com';
            accountList.add(acc);

            // Increment the processed record count
            processedRecordCount++;
        }

        // Perform the update
        Database.update(accountList, false);
    }

    global void finish(Database.BatchableContext BC) {
        // Send email notification
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setToAddresses(new String[]{userEmailAddress});
        system.debug('Email Id :'+userEmailAddress);
        email.setSubject('Batch Processing Completed');
        email.setPlainTextBody('The batch process for updating user records has finished. Total processed records: ' + String.valueOf(processedRecordCount));
        system.debug('The batch process for updating user records has finished. Total processed records: '+String.valueOf(processedRecordCount));
        // Optionally, you can set additional email properties such as CC, BCC, and email template

        Messaging.sendEmail(new Messaging.SingleEmailMessage[]{email});
    }    
}