public with sharing class arrayExample2 {
    public Account[] abc {get; set;}
    public arrayExample2() {
        Account a1 = new Account(name='ajinkya',industry= 'Banking');
        Account a2 = new Account(name='ravi',industry= 'Banking');
        Account a3 = new Account(name='yatish',industry= 'Banking');
        abc = new Account[]{a1,a2,a3};
    }
    
}