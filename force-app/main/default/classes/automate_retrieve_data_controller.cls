public with sharing class automate_retrieve_data_controller {
    static string ACCOUNT_OBJECT = 'Account';
    static string CONTACT_OBJECT = 'Contact';
    static string OPPORTUNITY_OBJECT = 'Opportunity';
    public automate_retrieve_data_controller() {

    }

    @AuraEnabled(cacheable=true)
    public static List<SObject> getObject(String objectName) {
        if(objectName==ACCOUNT_OBJECT){
            List<Account> lstAccounts = [SELECT AccountNumber,AccountSource,Account_ID__c,Active__c,AnnualRevenue,BillingAddress,
                                        BillingCity,BillingCountry,BillingGeocodeAccuracy,BillingLatitude,BillingLongitude,BillingPostalCode,
                                        BillingState,BillingStreet,ChannelProgramLevelName,ChannelProgramName,CleanStatus,Company_Name__c,Contact_Name__c,
                                        CreatedById,CreatedDate,CustomerPriority__c,DandbCompanyId,Description,DunsNumber,Email__c,Fax,Id,Industry,IsCustomerPortal,
                                        IsDeleted,IsPartner,Jigsaw,JigsawCompanyId,LastActivityDate,LastModifiedById,LastModifiedDate,LastReferencedDate,LastViewedDate,
                                        MasterRecordId,NaicsCode,NaicsDesc,Name,NumberOfEmployees,NumberofLocations__c,OperatingHoursId,OwnerId,Ownership,ParentId,Phone,Phone__c,
                                        PhotoUrl,Rating,ShippingAddress,ShippingCity,ShippingCountry,ShippingGeocodeAccuracy,ShippingLatitude,ShippingLongitude,ShippingPostalCode,
                                        ShippingState,ShippingStreet,Sic,SicDesc,Site,SLAExpirationDate__c,SLASerialNumber__c,SLA__c,SystemModstamp,TickerSymbol,Tradestyle,Type,
                                        UpsellOpportunity__c,Website,YearStarted 
                                        FROM Account
                                        WHERE CreatedDate >= LAST_N_MONTHS:6];
            System.debug('Account records are successfully returned');
            return lstAccounts;
        }

        if(objectName==CONTACT_OBJECT){
            List<Contact> lstContacts = [SELECT AccountId, Email, CreatedDate, Id, FirstName, LastName, LeadSource, MailingCity, Name, Phone 
                                        FROM Contact
                                        WHERE CreatedDate >= LAST_N_MONTHS:6];
            System.debug('Contact records are successfully returned');
            return lstContacts;
        }

        return null;
    }

    @AuraEnabled
    public static List<SObject> getInfo(String query, String objectName, Integer numberofMonths){
        try {
            if(query != null && objectName != null && numberofMonths!= null){
                query += ', CreatedDate '; 
                String sQuery = 'SELECT '+query+' FROM '+objectName+' WHERE CreatedDate >= LAST_N_MONTHS:'+ numberofMonths;
                System.debug('[DEBUG] sQuery :: ' + sQuery);
                List<SObject> records = Database.query(sQuery);
                for(SObject obj: records){
                    System.debug('Records [DEBUG] :: '+obj);
                }
                return records;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return null;    
    }

}