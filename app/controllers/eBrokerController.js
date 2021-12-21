"use strict";

/**
 * Module dependencies.
 */
const db = require("../../config/sequelize")
const logger = require("../../config/winston")
const brokerService = require("../services/brokerService")

var apiFunctions = {
    buyEquity: async (req,res) => {
        let responseObj = {
            responseCode:200,
            message:"",
            data:{}
        }
        let traderId = req.body && req.body.traderId || "";
        let equityName = req.body && req.body.equityName || "";
        let equityValue = req.body && req.body.equityValue || "";
        if(!traderId || traderId == ""){
            responseObj.responseCode = 400;
            responseObj.message = "no trader id found";
            return res.status(responseObj.responseCode).jsonp(responseObj)    
        }

        if(!equityName || equityName == ""){
            responseObj.responseCode = 400;
            responseObj.message = "no equity name found";
            return res.status(responseObj.responseCode).jsonp(responseObj)    
        }

        if(!equityValue || equityValue == ""){
            responseObj.responseCode = 400;
            responseObj.message = "no equity value found";
            return res.status(responseObj.responseCode).jsonp(responseObj)    
        }

        try {
            let trader = await db.Trader.findOne({
                where:{
                    id:traderId
                }
            });
            if(trader) {
                if(brokerService.checkIfAllowedToBuy(new Date())){
                    if(brokerService.checkIfTraderHasSufficientFunds(trader.funds, equityValue)){
                        trader.funds = parseInt(trader.funds - equityValue).toFixed(0);
                        await trader.save();
                        let traderEquity = {
                            trader_id:trader.id,
                            equity_name:equityName,
                            equity_value:parseInt(equityValue).toFixed(0),
                            created_at:new Date()
                        };
                        await db.TraderEquities.create(traderEquity);
                        responseObj.message = "equity bought successfully";
                        return res.status(responseObj.responseCode).jsonp(responseObj)
                    } else {
                        responseObj.responseCode = 400;
                        responseObj.message = "no sufficiet funds available";
                        return res.status(responseObj.responseCode).jsonp(responseObj);
                    }
                } else {
                    responseObj.responseCode = 400;
                    responseObj.message = "not allowed to buy equity at this time";
                    return res.status(responseObj.responseCode).jsonp(responseObj);
                }
            } else {
                responseObj.responseCode = 400;
                responseObj.message = "no trader found with this id";
                return res.status(responseObj.responseCode).jsonp(responseObj);
            }
        } catch (e) {
            logger.error("error occured in addFunds",e);
            responseObj.responseCode = 500;
            responseObj.message = "Something went wrong";
            return res.status(responseObj.responseCode).jsonp(responseObj)
        }
    },
    sellEquity: async (req,res) => {
        let responseObj = {
            responseCode:200,
            message:"",
            data:{}
        }
        let traderId = req.body && req.body.traderId || "";
        let equityName = req.body && req.body.equityName || "";
        let equityValue = req.body && req.body.equityValue || "";
        if(!traderId || traderId == ""){
            responseObj.responseCode = 400;
            responseObj.message = "no trader id found";
            return res.status(responseObj.responseCode).jsonp(responseObj)    
        }

        if(!equityName || equityName == ""){
            responseObj.responseCode = 400;
            responseObj.message = "no equity name found";
            return res.status(responseObj.responseCode).jsonp(responseObj)    
        }

        if(!equityValue || equityValue == ""){
            responseObj.responseCode = 400;
            responseObj.message = "no equity value found";
            return res.status(responseObj.responseCode).jsonp(responseObj)    
        }

        equityValue = parseInt(equityValue).toFixed(0)
        try {
            let trader = await db.Trader.findOne({
                where:{
                    id:traderId
                }
            });
            if(trader) {
                if(brokerService.checkIfAllowedToBuy(new Date())){
                    let equityFound = await db.TraderEquities.findOne({
                        where:{
                            trader_id:trader.id,
                            equity_name:equityName,
                            equity_value:equityValue
                        },
                    });
                    if(equityFound){
                        // logger.info("equityFound",equityFound);
                        await equityFound.destroy();
                        trader.funds = parseInt(trader.funds + equityFound.equity_value).toFixed(0);
                        await trader.save();
                        responseObj.responseCode = 200;
                        responseObj.message = "equity sold successfully";
                        return res.status(responseObj.responseCode).jsonp(responseObj);
                    } else {
                        responseObj.responseCode = 400;
                        responseObj.message = "Trader doesn't have this equity for this amount";
                        return res.status(responseObj.responseCode).jsonp(responseObj);    
                    }
                } else {
                    responseObj.responseCode = 400;
                    responseObj.message = "not allowed to buy equity at this time";
                    return res.status(responseObj.responseCode).jsonp(responseObj);
                }
            } else {
                responseObj.responseCode = 400;
                responseObj.message = "no trader found with this id";
                return res.status(responseObj.responseCode).jsonp(responseObj);
            }
        } catch (e) {
            logger.error("error occured in addFunds",e);
            responseObj.responseCode = 500;
            responseObj.message = "Something went wrong";
            return res.status(responseObj.responseCode).jsonp(responseObj)
        }
    }
}
module.exports = apiFunctions