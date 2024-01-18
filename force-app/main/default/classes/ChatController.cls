public with sharing class ChatController {
    @AuraEnabled
    public static void saveChatMessage(String senderId, String recipientId, String message) {
        Chat_Message__c chat = new Chat_Message__c();
        chat.Name = 'Chat of '+senderId;
        chat.Sender__c = senderId;
        chat.Receiver__c = recipientId;
        chat.Message__c = message;
        chat.Timestamp__c = Datetime.now();
        
        insert chat;
        
        ChatMessageEvent__e event = new ChatMessageEvent__e();
        event.Sender__c = senderId;
        event.Recipient__c = recipientId;
        event.Message__c = message;
        
        EventBus.publish(event);
    }
}