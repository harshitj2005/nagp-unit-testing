"use strict";

/**
 * Module dependencies.
 */
let chai = require("chai");
// let winston = require("../../config/winston");
let Trader = require("../../app/models/traders");

chai.should();

describe("Trader model", function() {
    let traderModel;
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

        traderModel = Trader(sequelizeStub, datatypesStub);
    });

    describe("name", function(){
        it("name should be equal to: Trader", function(){
            // winston.info("traderModel",traderModel)
            traderModel.name.should.equal("Trader");
        });
    });

    describe("data", function() {
        it("should have id", function() {
            traderModel.fields.id.type.should.exist.and.equal("UUID");
        });
        it("should have funds", function() {
            traderModel.fields.funds.type.should.exist.and.equal("INTEGER");
        });
        it("should have created_at", function() {
            traderModel.fields.created_at.type.should.exist.and.equal("DATE");
        });
        it("should have modified_at", function() {
            traderModel.fields.modified_at.type.should.exist.and.equal("DATE");
        });
    });

    describe("properties", function(){
        describe("hooks methods", function(){
            describe("beforeCreate", function(){
                it("should update created_at in beforeCreate", function(){
                    var beforeCreate = traderModel.properties.hooks.beforeCreate(traderModel);
                    beforeCreate.should.be.a("Promise");
                });
                it("should update modified_at in beforeCreate", function(){
                    var beforeCreate = traderModel.properties.hooks.beforeCreate(traderModel);
                    beforeCreate.should.be.a("Promise");
                });
            });

            describe("beforeUpdate", function(){
                it("should update created_at in beforeUpdate", function(){
                    var beforeUpdate = traderModel.properties.hooks.beforeUpdate(traderModel);
                    beforeUpdate.should.be.a("Promise");
                });
            });
        });
    });

    after(function(done) {
        done();
    });
});