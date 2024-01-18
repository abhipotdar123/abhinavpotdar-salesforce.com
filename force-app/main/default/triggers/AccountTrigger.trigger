trigger AccountTrigger on Account (after insert) {
    AccountTriggerController.afterInsert(trigger.new);
}