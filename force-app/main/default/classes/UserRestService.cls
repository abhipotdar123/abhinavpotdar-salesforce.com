@RestResource(urlMapping='/api/TeamTime/*')
global with sharing class UserRestService
{
    @HttpGet
    global static List<User__c> doGet() {
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
        res.addHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
		res.addHeader('Content-Type', 'application/json');
        system.debug('req.requestURI '+req.requestURI);
       	String userName = req.requestURI.substring(req.requestURI.lastIndexOf('=')+1);
        system.debug('userName: '+userName);
        List<User__c> userLists;
        if(!String.isEmpty(userName)){
            userLists = [ SELECT Contact_Number__c, Email__c, Id, Name, Timezone__c, Gender__c, City__c, Skills__c
						FROM User__c
						WHERE Name LIKE :'%'+userName+'%'
						ORDER BY Name];
        }else{
            userLists = [ SELECT Contact_Number__c, Email__c, Id, Name, Timezone__c, Gender__c, City__c, Skills__c
                         FROM User__c 
                         ORDER BY Name
                         LIMIT 50];
            system.debug('isCheck: '+userName);
        }
        return userLists;
    }
}