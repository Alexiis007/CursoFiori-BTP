sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    function myCheck(){
        var inputEmployee = this.byId("inputEmployee");
        var valueEmployee = inputEmployee.getValue();

        if (valueEmployee.length == 6){
            inputEmployee.setDescription("Ok");
        }
        else{
            inputEmployee.setDescription("Not Ok")
        }
    }

    return Controller.extend("logaligroup.main.controller.main", {
        onInit() {
        },
        OnValidate : myCheck
    });
});