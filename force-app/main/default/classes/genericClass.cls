public with sharing class genericClass {

    public static String RoleToCheck(String userRole) {
        Map<String, GTM_Roles_Mapping__c> gtmRoles = GTM_Roles_Mapping__c.getAll();
        Map<String, GTM_Roles_Mapping__c> gbpRoles = new Map<String, GTM_Roles_Mapping__c>();
        for(GTM_Roles_Mapping__c abc: gtmRoles.values()){
            gbpRoles.put(abc.New_Role__c, abc);
        }
        String groupName = gbpRoles.get(userRole).Group__c;
        system.debug('groupName: '+groupName);
        return groupName;
    }
}