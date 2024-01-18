public class SalesforceAccessTokenRetrieval {
    
    public static String getAccessToken(String username, String password, String clientId, String clientSecret) {
        // Salesforce authentication endpoint
        String authEndpoint = 'https://login.salesforce.com/services/oauth2/token';
        
        // Create the payload for the request
        String requestBody = 'grant_type=password&client_id=' + clientId +
            '&client_secret=' + clientSecret +
            '&username=' + EncodingUtil.urlEncode(username, 'UTF-8') +
            '&password=' + EncodingUtil.urlEncode(password, 'UTF-8');
        
        // Make the HTTP request
        HttpRequest request = new HttpRequest();
        request.setEndpoint(authEndpoint);
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.setBody(requestBody);
        
        // Execute the request
        Http http = new Http();
        HttpResponse response = http.send(request);
        
        // Parse the response and retrieve the access token
        if (response.getStatusCode() == 200) {
            Map<String, Object> jsonResponse = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            string accessToken = (String) jsonResponse.get('access_token');
            system.debug('Access Token: '+accessToken);
            return (String) jsonResponse.get('access_token');
        } else {
            // Handle error response
            System.debug('Error response: ' + response.getBody());
            return null;
        }
    }
}