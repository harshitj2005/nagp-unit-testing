const logger = require("../../config/winston");

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const allowedDays = [1,2,3,4,5];
const allowedHours = [9,10,11,12,13,14,15,14];

let functions = {
    checkIfAllowedToBuy: (dateObj) => {
        let dayOfWeek = dateObj.getDay();
        let day = days[dayOfWeek];
        if(allowedDays.includes(dayOfWeek)){
            dateObj.setHours(dateObj.getHours() - 2)
            let currentHour = dateObj.getHours();
            if(allowedHours.includes(currentHour)){
                return true;
            } else {
                logger.info("not allowed as current hour is",currentHour);
                return false;
            }
        } else {
            logger.info("not allowed as current day is",day);
            return false;
        }
    },
    checkIfTraderHasSufficientFunds: (funds, equityValue) => {
        if(equityValue <= funds){
            return true;
        } else {
            return false;   
        }
    }
}
module.exports = functions;