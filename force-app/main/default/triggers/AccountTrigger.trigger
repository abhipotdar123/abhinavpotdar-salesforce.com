trigger AccountTrigger on Account (after insert, before delete) {
    
    if(trigger.isBefore && trigger.isDelete){
        AccountTriggerController.beforeDelete(trigger.old);
    }
}