@RestResource(urlMapping='/LeadService/*')
global class LeadRestService {

    @HttpGet
    global static List<Lead> getLeadInformation() {
        RestRequest req = RestContext.request;
        String requestURI = req.requestURI;
        String leadName = '%' + requestURI.substringAfterLast('=') + '%';
        
        List<Lead> leadList = [
            SELECT Id, Name, Email, Phone, Company, MobilePhone 
            FROM Lead 
            WHERE Name LIKE :leadName
        ];


        // Log the request and response
        System.debug('Request body: ' + req.requestBody.toString());
        System.debug('Response body: ' + JSON.serialize(leadList));

        return leadList;
    }
    
    @HttpDelete
    global static string deleteMatchingLead(){
        string responseMessage;
        integer leadCount =0;
        try{
            RestRequest req = RestContext.request;
            RestResponse res = RestContext.response;
            system.debug('req.requestURI'+req.requestURI);
            string requestURI = req.requestURI;       
            string leadName ='%'+requestURI.substring(requestURI.lastIndexOf('=')+1)+'%';
            system.debug('leadName'+leadName);
            list<lead> leadlist = [SELECT Id,Name,Email,Phone,Company,MobilePhone from lead where Name like :leadName];
            if(leadlist!=NULL && leadlist.size()>0){
                leadCount = leadlist.size();
            }
            delete leadlist;
        }
        catch(Exception ex){
            responseMessage =  'Exception occured during delete =>'+ex.getMessage();   
        }
        responseMessage =  'Lead deleted sucesfully => lead deleted count : '+leadCount;
        return responseMessage;
    }
}