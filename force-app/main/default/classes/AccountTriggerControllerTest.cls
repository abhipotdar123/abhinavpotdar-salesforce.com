@isTest
private class AccountTriggerControllerTest {
    @isTest
    static void testBeforeDelete() {
        
        List<Account> lstAccounts = [SELECT Id, Name, Active__c FROM Account ];
        
        Test.startTest();
        try {
            delete lstAccounts;
        } catch (Exception e) {
            String expectedErrorMessage = 'You can not delete this Account, As this Account still active';
            Assert.isTrue(e.getMessage().contains(expectedErrorMessage));
            system.debug('Error Message: '+e.getMessage());
        }
        Test.stopTest();
        
        List<Account> remainingAccounts = [SELECT Id FROM Account WHERE Id = :lstAccounts[0].Id];
        System.assertEquals(1, remainingAccounts.size());
    }
    
    @TestSetup
    static void makeData(){
        Account activeAccount = new Account(Name = 'Active Account', Active__c = 'Yes');
        insert activeAccount;
    }
}