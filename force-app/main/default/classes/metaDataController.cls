public with sharing class metaDataController {
    public metaDataController() {
        
    }

    @AuraEnabled(cacheable=true)
    public static User getUserInfo(){
        try {
            User currentUser = [SELECT Id, Name, Email FROM User WHERE Id = :UserInfo.getUserId()];
            return currentUser;          
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled(cacheable=true)
    public static Map<String, List<String>> getObjectFields(String objectName) {
        system.debug('Selected Object:: '+objectName);
        Map<String, List<String>> fieldsMap = new Map<String, List<String>>();
        List<String> fields = new List<String>();
        
        try {
            // Fetch object describe information
            Schema.DescribeSObjectResult describeResult = Schema.getGlobalDescribe().get(objectName).getDescribe();
            
            // Iterate over fields and populate the list
            for (Schema.SObjectField field : describeResult.fields.getMap().values()) {
                fields.add(field.getDescribe().getName());
            }
            
            fieldsMap.put(objectName, fields);
        } catch (Exception ex) {
            // Handle any exceptions
        }
        
        return fieldsMap;
    }

    @AuraEnabled(cacheable=true)
    public static List<SObject> getInfo(String query, String objectName, Integer numberofMonths) {
        System.debug('query coming from UI: ' + query);
        try {
            if (query != null && objectName != null && numberofMonths != null) {
                if (!query.contains('CreatedDate')) {
                    //query += ', CreatedDate';
                }
                String sQuery = 'SELECT ' + query + ' FROM ' + objectName ;
                System.debug('[DEBUG] sQuery :: ' + sQuery);
                List<SObject> records = Database.query(sQuery);
                for (SObject obj : records) {
                    System.debug('Records [DEBUG] :: ' + obj);
                }
                return records;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return new List<SObject>();
    }

    @AuraEnabled(cacheable=true)
    public static String getLocationName(String latitude, String longitude) {
        String apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key='+system.label.googleMapsApiKey;
        
        HttpRequest request = new HttpRequest();
        request.setEndpoint(apiUrl);
        request.setMethod('GET');
        
        HttpResponse response = new Http().send(request);
        System.debug(response.getBody());
        if (response.getStatusCode() == 200) {
            Map<String, Object> apiResponse = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            
            List<Object> results = (List<Object>) apiResponse.get('results');
            
            if (!results.isEmpty()) {
                Map<String, Object> result = (Map<String, Object>) results[0];
                String locationName = (String) result.get('formatted_address');
                return locationName;
            }
        }
        
        return 'Location name not found.';
    }
    
    @AuraEnabled(cacheable=true)
    public static List<String> getAllObjects() {
        List<String> objectNames = new List<String>();
        
        try {
            Map<String, Schema.SObjectType> globalDescribe = Schema.getGlobalDescribe();
            
            for (String objectName : globalDescribe.keySet()) {
                objectNames.add(objectName);
                system.System.debug('Object Name : ' + objectName);
            }
        } catch (Exception ex) {
            // Handle any exceptions
        }
        
        return objectNames;
    }
}