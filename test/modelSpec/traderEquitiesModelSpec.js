"use strict";

/**
 * Module dependencies.
 */
let chai = require("chai");
// let winston = require("../../config/winston");
let TraderEquities = require("../../app/models/trader_equities");

chai.should();

describe("TraderEquities model", function() {
    let traderEquitiesModel;
    before(function() {
        var sequelizeStub = {
            define: function(modelName, fields, properties){
                return {
                    name : modelName,
                    fields: fields,
                    properties: properties
                };
            },
            fn: function(param){
                return param;
            }
        };

        var datatypesStub = {
            STRING: "STRING",
            INTEGER: () => {return "INTEGER"},
            DATE:"DATE",
            UUID:"UUID",
            UUIDV1:"UUIDV1"
        };

        traderEquitiesModel = TraderEquities(sequelizeStub, datatypesStub);
    });

    describe("name", function(){
        it("name should be equal to: TraderEquities", function(){
            // winston.info("traderEquitiesModel",traderEquitiesModel)
            traderEquitiesModel.name.should.equal("TraderEquities");
        });
    });

    describe("data", function() {
        it("should have id", function() {
            traderEquitiesModel.fields.id.type.should.exist.and.equal("UUID");
        });
        it("should have trader_id", function() {
            traderEquitiesModel.fields.trader_id.type.should.exist.and.equal("STRING");
        });
        it("should have equity_name", function() {
            traderEquitiesModel.fields.equity_name.type.should.exist.and.equal("STRING");
        });
        it("should have equity_value", function() {
            traderEquitiesModel.fields.equity_value.type.should.exist.and.equal("INTEGER");
        });
        it("should have created_at", function() {
            traderEquitiesModel.fields.created_at.type.should.exist.and.equal("DATE");
        });
        it("should have modified_at", function() {
            traderEquitiesModel.fields.modified_at.type.should.exist.and.equal("DATE");
        });
    });

    describe("properties", function(){
        describe("hooks methods", function(){
            describe("beforeCreate", function(){
                it("should update created_at in beforeCreate", function(){
                    var beforeCreate = traderEquitiesModel.properties.hooks.beforeCreate(traderEquitiesModel);
                    beforeCreate.should.be.a("Promise");
                });
                it("should update modified_at in beforeCreate", function(){
                    var beforeCreate = traderEquitiesModel.properties.hooks.beforeCreate(traderEquitiesModel);
                    beforeCreate.should.be.a("Promise");
                });
            });

            describe("beforeUpdate", function(){
                it("should update created_at in beforeUpdate", function(){
                    var beforeUpdate = traderEquitiesModel.properties.hooks.beforeUpdate(traderEquitiesModel);
                    beforeUpdate.should.be.a("Promise");
                });
            });
        });
    });

    after(function(done) {
        done();
    });
});