({
    onCheck : function(component, event, helper) {
        var checkboxValue = event.getSource().get("v.value");
        component.set("v.checkboxValue", checkboxValue);
    }
})