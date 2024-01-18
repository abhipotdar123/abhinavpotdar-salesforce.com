Public class C_Sample_Class{
    
    // In this example we will see
    // A method to create a contact record 
    // with 3 parameters
    // Returning Id of record.
    @AuraEnabled
    Public static Id m_Insert_A_Contact_Record(String a_First_Name, String a_Last_Name, String a_Email){
        
        try{
            Contact a_Rec = new Contact();
            
            a_Rec.FirstName = a_First_Name;
            a_Rec.LastName = a_Last_Name;
            a_Rec.Email = a_Email;
            
            Insert a_Rec;
            return a_Rec.Id;
        }
        catch(Exception ex){
            System.debug('An Exception: '+ex);
            return null;
        }
    }
}