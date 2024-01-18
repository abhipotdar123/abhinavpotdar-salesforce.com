public with sharing class ChatGPTAPIController {
    public static String BASE_URL = 'https://api.openai.com/v1/chat/completions'; 
    public static String API_KEY = System.Label.chatGPTAPI_KEY;
    
    public ChatGPTAPIController() {
        
    }
    @AuraEnabled(cacheable=true)
    public static String getResponse(String question) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(BASE_URL);
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json');
        request.setHeader('Authorization', 'Bearer ' + API_KEY);
        request.setTimeout(120000);
        
        String body = '{ "model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": "'+ question +'"}] }';
        request.setBody(body);
        
        HttpResponse response = http.send(request);
        
        if (response.getStatusCode() == 200) {
            // Success - parse the response body
            String responseBody = response.getBody();
            System.debug('[RESPONSE BODY] :: '+responseBody);
            
            // Parse the JSON string
            Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(responseBody);
            System.debug('[RESPONSE MAP] :: ' + responseMap);
            
            // Get the value of the content field
            List<Object> choicesList = (List<Object>) responseMap.get('choices');
            Map<String, Object> choicesMap = (Map<String, Object>) choicesList.get(0);
            Map<String, Object> messageMap = (Map<String, Object>) choicesMap.get('message');
            String content = (String) messageMap.get('content');
            
            System.debug(content);
            
            System.debug('Answer of '+question+' '+content); 
            
            return content;
        } else {
            // Error - handle the failure
            System.debug('Error response: ' + response.getBody());
        }
        return response.getBody();
    }
}