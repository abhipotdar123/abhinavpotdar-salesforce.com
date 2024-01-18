public with sharing class arrayExample {
    public string[] myval {get; set;} //Declaration of getter and setter method with Array of string type
    public string name {get; set;}
    
    public arrayExample() {
        name = 'prasad';
        myval = new string[] {'sam', 'ram', 'jack'};
    }
    
}