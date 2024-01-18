public with sharing class Utility {
    public Utility() {

    }

    public static Map<String, String> getRolesMapping() {
        Map<String, GTM_Roles_Mapping__c> gtmRoles = GTM_Roles_Mapping__c.getAll();
        Map<String, String> rolesMap = new Map<String, String>();
        for(GTM_Roles_Mapping__c gtm: gtmRoles.values()){
            if(String.isNotBlank(gtm.New_Role__c)){
                rolesMap.put(gtm.New_Role__c, gtm.Group__c);
            }
            if(String.isNotBlank(gtm.Old_Role__c)){
                rolesMap.put(gtm.Old_Role__c, gtm.Group__c);
            }
        }
        return rolesMap;
    }

    public static Map<String, List<String>> getGroupRoleMapping() {
        Map<String, GTM_Roles_Mapping__c> gtmRoles = GTM_Roles_Mapping__c.getAll();
        Map<String, List<String>> rolesMap = new Map<String, List<String>>();

        for(GTM_Roles_Mapping__c gtm: gtmRoles.values()){
            if(String.isNotBlank(gtm.Group__c)){
                if(!rolesMap.ContainsKey(gtm.Group__c)){
                    rolesMap.put(gtm.Group__c, new List<String>{gtm.New_Role__c, gtm.Old_Role__c});
                }
                else{
                    rolesMap.get(gtm.Group__c).add(gtm.New_Role__c);
                    rolesMap.get(gtm.Group__c).add(gtm.Old_Role__c);
                }
            }
        }
        return rolesMap;
    }

    //Role Hierarchy
    public static Set<ID> getAllSubRoleIds(Set<ID> roleIds) {

        Set<ID> currentRoleIds = new Set<ID>();
    
        // get all of the roles underneath the passed roles
        for(UserRole userRole :[select Id from UserRole where ParentRoleId 
             IN :roleIds AND ParentRoleID != null]) {
            currentRoleIds.add(userRole.Id);
        }
    
        // go fetch some more rolls!
        if(currentRoleIds.size() > 0) {
            currentRoleIds.addAll(getAllSubRoleIds(currentRoleIds));
        }
    
        return currentRoleIds;
    }
    // To get all Parent Roles.
    public static Set<ID> getParentRoleId(Set<ID> roleIds) {

        Set<ID> currentRoleIds = new Set<ID>();
    
        
        // get all of the parent roles.
        for(UserRole ur :[select Id, ParentRoleId from UserRole where Id IN: roleIds]) {
            currentRoleIds.add(ur.ParentRoleId);
        }
    
        // go fetch some more rolls!
        if(currentRoleIds.size() > 0) {
            currentRoleIds.addAll(getParentRoleId(currentRoleIds));
        }
    
        return currentRoleIds;
    }
}