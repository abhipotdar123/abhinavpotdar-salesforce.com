public with sharing class ExchangeRateAPI_Controller {
    //https://v6.exchangerate-api.com/v6/bcc7113857bf2477371f766c/latest/INR
    public static String BASE_URL = 'https://v6.exchangerate-api.com/v6/';
    public static String LATEST_KEYWORD = '/latest/';
    public static String API_KEY = System.Label.ExchangeRate_API_KEY;
    public string BaseCode;
    
    public static String getRate(String BaseCode) {
        
        String endpoint = BASE_URL + API_KEY + LATEST_KEYWORD + BaseCode;
        system.debug('Endpoint: '+endpoint);
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpoint);
        request.setMethod('GET');
        
        Http http = new Http();
        HttpResponse response = http.send(request);
        system.debug('HttpResponse: '+response);
        
        if (response.getStatusCode() == 200) {
            string responseString = response.getBody();
            return response.getBody();
        } else {
            return 'Error: ' + response.getStatusCode() + ' ' + response.getStatus();
        }
    }
    
    public static void toCurrency(){
        
    }
}