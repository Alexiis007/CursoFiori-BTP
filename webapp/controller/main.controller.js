sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
], (Controller, Filter, FilterOperator) => {
    "use strict";

    function myCheck(){
        var inputEmployee = this.byId("inputEmployee");
        var valueEmployee = inputEmployee.getValue();

        if (valueEmployee.length >= 6){
            //inputEmployee.setDescription("Ok");
            this.byId("labelCountry").setVisible(true);
            this.byId("slCountry").setVisible(true);
        }
        else{
            //inputEmployee.setDescription("Not Ok")
            this.byId("labelCountry").setVisible(false);
            this.byId("slCountry").setVisible(false);
        }
    }

    return Controller.extend("logaligroup.main.controller.main", {

        onInit() {
            var oJSONModel = new sap.ui.model.json.JSONModel();
            var oView = this.getView();

            // Cargar el modelo i18n manualmente
            var oI18nModel = new sap.ui.model.resource.ResourceModel({
            bundleName: "logaligroup.main.i18n.i18n"  // Ruta del archivo i18n.properties
            });

            // Establecer el modelo i18n en la vista
            oView.setModel(oI18nModel, "i18n");

            // Obtener el ResourceBundle
            var i18nBundle = oI18nModel.getResourceBundle();

            // var oJSON = {
            //     employeeId : "12346",
            //     countryKey : "UK",
            //     listCountry : [
            //         {
            //             key : "US",
            //             text : i18nBundle.getText("countryUS")
            //         },
            //         {
            //             key : "UK",
            //             text : i18nBundle.getText("countryUK")
            //         },
            //         {
            //             key : "ES",
            //             text : i18nBundle.getText("countryES")
            //         },
            //     ]
            // };
            // oJSONModel.setData(oJSON);
            oJSONModel.loadData("./localService/mockdata/Employees.json", false);
            oJSONModel.attachRequestCompleted(function (oEventModel){
                console.log(JSON.stringify(oJSONModel.getData()));
            });
            oView.setModel(oJSONModel);
        },
        onFilter(){
            var oJSON = this.getView().getModel().getData();
            var filters = [];
            if (oJSON.employeeId !== ""){
                filters.push(new Filter("employeeId", FilterOperator.EQ, oJSON.employeeId))
            }
            if (oJSON.countryKey !== ""){
                filters.push(new Filter("country", FilterOperator.EQ, oJSON.countryKey))
            }
            var oList = this.byId("tableEmployee");
            var oBinding = oList.getBinding("items");
            oBinding.filter(filters);
        },
        onClearFilter(){
            //Poner los valores vacios no me funciono
            var oModel = this.getView().getModel();
            oModel.setProperty("/employeeId", "");
            oModel.setProperty("/countryKey", "");
            //En cambio poner el filtro de busqueda de la tabla en vacio si funciono.
            var oList = this.byId("tableEmployee");
            var oBinding = oList.getBinding("items");
            oBinding.filter("");
        },
        showPostalCode(oEvent){
            console.log("Boton presionado")
            var itemPressed = oEvent.getSource();
            var oContext = itemPressed.getBindingContext();
            var objectContext = oContext.getObject();

            sap.m.MessageToast.show(objectContext.title)
        },
        OnValidate : myCheck
    });
});