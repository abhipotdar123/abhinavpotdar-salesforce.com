public with sharing class ChatEngineApiCallout {

    public static void createUser() {
        String url = 'https://api.chatengine.io/users/';
        String apiKey = 'f2467e70-2798-4a56-a101-6663ec0f645a';

        Map<String, Object> payloadMap = new Map<String, Object>();
        payloadMap.put('username', 'abhinavpotdar');
        payloadMap.put('first_name', 'Abhinav');
        payloadMap.put('last_name', 'Potdar');
        payloadMap.put('secret', 'abhinav123');
        payloadMap.put('custom_json', new Map<String, Object>{ 'high_score' => 2000 });

        String payload = JSON.serialize(payloadMap);

        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setMethod('POST');
        req.setHeader('PRIVATE-KEY', apiKey);
        req.setHeader('Content-Type', 'application/json');
        req.setBody(payload);

        Http http = new Http();
        HttpResponse res = http.send(req);

        if (res.getStatusCode() == 200) {
            // Successful API call
            System.debug('User creation successful: ' + res.getBody());
        } else {
            // Handle error
            System.debug('Error during user creation. Status code: ' + res.getStatusCode());
            System.debug('Response body: ' + res.getBody());
        }
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