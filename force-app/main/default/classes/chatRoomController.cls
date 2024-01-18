public with sharing class chatRoomController {
    @AuraEnabled(cacheable=true)
    public static List<Object> getAllUsers() {
        List<User> users = new List<User>();
        
        // Query for User records with the System Administrator profile
        users = [SELECT Id, Name, Email,AvatarUrl__c, CommunityNickname, Address FROM User WHERE Profile.Name = 'System Administrator'];
        system.debug('Users: '+users);
        return users;
    }

    public static void getUsers() {
        String url = 'https://api.chatengine.io/users/';
        String apiKey = 'f2467e70-2798-4a56-a101-6663ec0f645a';
    
        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setMethod('GET');
        req.setHeader('PRIVATE-KEY', apiKey);
    
        Http http = new Http();
        HttpResponse res = http.send(req);
        system.debug('Response :: '+res);
        if (res.getStatusCode() == 200) {
            // Successful API call
            String responseBody = res.getBody();
            System.debug('Response body:\n' + responseBody);
        } else {
            // Handle error
            System.debug('Error during API call. Status code: ' + res.getStatusCode());
            System.debug('Response body: ' + res.getBody());
        }
    }
}