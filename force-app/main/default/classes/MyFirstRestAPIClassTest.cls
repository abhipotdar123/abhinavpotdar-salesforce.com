@IsTest
private class MyFirstRestAPIClassTest {

    static testMethod void testGetMethod(){
        User__c acc = new User__c();
        acc.Name='Test';
        insert acc;
        
        RestRequest request = new RestRequest();
        request.requestUri ='/services/apexrest/api/TeamTime';
        request.httpMethod = 'GET';
        RestContext.request = request;
        List<User__c> acct = UserRestService.doGet();
        System.assert(acct != null);
        System.assertEquals('Test', acct[0].Name);
        
    }
}