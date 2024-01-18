public with sharing class CurrencyExchangeRatesController {
    
    public static string BASE_URL = 'https://v6.exchangerate-api.com/v6/';
    public static string API_KEY = system.Label.ExchangeRate_API_KEY; 
    public static string LATEST_KEYWORD = '/latest/';
    
    public CurrencyExchangeRatesController() {
        
    }
    //https://v6.exchangerate-api.com/v6/bcc7113857bf2477371f766c/latest/USD
    @AuraEnabled(cacheable=true)
    public static Decimal getExchangeRates(String fromcurrencies, String tocurrencies) {
        Http http = new Http ();
        HttpRequest request = new HttpRequest();
        String Endpoint = BASE_URL + API_KEY + LATEST_KEYWORD + fromcurrencies;
        
        system.debug('[DEBUG] Endpoint:: '+Endpoint);
        request.setEndpoint(Endpoint);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        
        if (response.getStatusCode() == 200) {
            return ConversionRate(fromcurrencies, tocurrencies, response);
            
        } else {
            System.debug(response.getStatus() + ' ' + response.getBody());
            throw new AuraHandledException('An error occurred while fetching the exchange rates. Please try again later.');
        }        
    }
    
    public static Decimal ConversionRate(String fromCurrency, String toCurrency, HttpResponse responseBody) {
        if (responseBody != null) {
            // Deserialize the JSON response into a Map
            Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(responseBody.getBody());
            System.debug('[DEBUG] RESULT ::'+responseMap);
            
            // Check if the API response indicates success
            system.debug('[DEBUG] Condition Check:: '+ (responseMap.get('result')));
            
            if (responseMap.get('result') == 'success') {
                
                // Extract the currency conversion rates into a Map
                Map<String, Object> conversionRates = (Map<String, Object>)responseMap.get('conversion_rates');
                Decimal toCurrenciesConversionRate = (Decimal)conversionRates.get(toCurrency);
                System.debug('[DEBUG]:: OUTPUT:: 1 ' + fromCurrency +' is Equal to '+ toCurrenciesConversionRate + ' ' + toCurrency  );
                Return toCurrenciesConversionRate;
                
            } else {
                // If the API response indicates failure, throw an exception
                String errorInfo = (String) responseMap.get('error.info');
                throw new AuraHandledException(errorInfo);
            }
            
        } else {
            System.debug(responseBody.getStatus() + ' ' + responseBody.getBody());
            throw new AuraHandledException('An error occurred while fetching the exchange rates. Please try again later.');
        }        
    }    
}