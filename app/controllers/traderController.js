"use strict";

const db = require("../../config/sequelize")
const logger = require("../../config/winston")
const commonFunctions = require("../helpers/commonFunctions")

let apiFunctions = {
    addFunds: async function(req,res){
        let responseObj = {
            responseCode:200,
            message:"",
            data:{}
        }

        let traderId = req.body && req.body.traderId || "";
        let funds = req.body && req.body.funds || "";
        if(!traderId || traderId == ""){
            responseObj.responseCode = 400;
            responseObj.message = "no trader id found";
            return res.status(responseObj.responseCode).jsonp(responseObj)    
        }

        if(!commonFunctions.isInteger(funds)){
            responseObj.responseCode = 400;
            responseObj.message = "no valid fund amount found";
            return res.status(responseObj.responseCode).jsonp(responseObj)    
        }
        try {
            let trader = await db.Trader.findOne({
                where:{
                    id:traderId
                }
            });
            if(trader) {
                funds = parseInt(funds);
                trader.funds = parseInt(trader.funds+funds).toFixed(0);
                await trader.save();
                responseObj.message = "funds added successfully";
                return res.status(responseObj.responseCode).jsonp(responseObj)
            } else {
                responseObj.responseCode = 400;
                responseObj.message = "no trader found with this id";
                return res.status(responseObj.responseCode).jsonp(responseObj)  
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