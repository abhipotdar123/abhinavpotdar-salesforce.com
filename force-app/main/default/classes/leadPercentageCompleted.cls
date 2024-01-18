public with sharing class leadPercentageCompleted {
	    
    public integer leadPercentageScore {get; set;}
    public string  leadPercentageColor {get; set;}
    String userRole = [SELECT UserRole.Name FROM User WHERE Id = :UserInfo.getUserId()].UserRole.Name;
    
    public leadPercentageCompleted(ApexPages.StandardController stdController) {
        Lead currentLead = (Lead)stdController.getRecord();
        String userRoleName = [SELECT UserRole.Name FROM User WHERE Id = :UserInfo.getUserId()].UserRole.Name;
        leadPercentageScore = 0;
        leadPercentageColor = 'black';
        // Field Values
        leadPercentageScore = 10;
		/** GTMVERT-106|| ABHINAV || 18 Aug 2023
		* roleGroup Defined.
		*/
		string roleGroup = genericClass.RoleToCheck(userRoleName);
		if (roleGroup == 'GBP Asia HK') {
	        if(currentLead.FirstName!=null){
	            leadPercentageScore += 10;
	        }
	        if(currentLead.Title!=null){
	            leadPercentageScore += 10;
	        }        
	        if(currentLead.Street!=null){
	            leadPercentageScore += 5;
	        }
	        if(currentLead.City!=null){
	            leadPercentageScore += 5;
	        }
	        if(currentLead.State!=null){
	            leadPercentageScore += 5;
	        }
	        if(currentLead.Email!=null){
	            leadPercentageScore += 5;
	        }
		} else {		
	        if(currentLead.FirstName!=null){
	            leadPercentageScore += 10;
	        }
	        if(currentLead.Title!=null){
	            leadPercentageScore += 10;
	        }        
	        if(currentLead.Email!=null){
	            leadPercentageScore += 10;
	        }
	        if(currentLead.Street!=null){
	            leadPercentageScore += 10;
	        }
	        if(currentLead.City!=null){
	            leadPercentageScore += 5;
	        }
	        if(currentLead.State!=null){
	            leadPercentageScore += 5;
	        }
		}		
        
        if(leadPercentageScore<33){
            leadPercentageColor = 'red';
        } else if(leadPercentageScore<66){
            leadPercentageColor = 'orange';
        } else{
            leadPercentageColor = 'green';
        }

    }

}