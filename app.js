const cash_in = {
    "percents": 0.03,
    "max": {
        "amount": 5,
        "currency": "EUR"
    }
}

const cash_out = {
    juridical: {
        "percents": 0.3,
        "min": {
            "amount": 0.5,
            "currency": "EUR"
        }
    },

    natural: {
        "percents": 0.3,
        "week_limit": {
            "amount": 1000,
            "currency": "EUR"
        }
    }
}

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    let weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}

// Checks if object is empty
function isEmpty(obj) {
    for(var key in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, key)){
            return false;
        }
    }
    return true;
}

// Calculates and returns fee
function feeCalculation (data, user) { 

    // User wants to top up his balance
    if (data.type === "cash_in") { 
        const fee = data.operation.amount * cash_in.percents/100; 

        // If calculated fee is lower than max fee return calculated one
        if (fee < cash_in.max.amount) { 
            return fee;
        }

        // Else return max fee, that is described in cash_in obj
        return cash_in.max.amount; 
    }

    // Cash out
    else { 
        if (data.user_type === "natural"){

            // Gets all week data from operation date
            const weekData = getWeekNumber(new Date(data.date));

            /* If user object with that id is empty - creates that obj
            And if one of the weekData element is not equal replaces obj information */
            if (isEmpty(user[data.user_id])
                || (user[data.user_id].weekData[0] != weekData[0] 
                || user[data.user_id].weekData[1] != weekData[1])) {
                user[data.user_id] = { 
                    weekData,

                    // Stores how much money user can cashout without fee
                    limit: cash_out.natural.week_limit.amount - data.operation.amount 
                }
            }

            // If user with that id object is already created and weekDate is equal
            else { 
                user[data.user_id].limit -= data.operation.amount;
            }

            /* If there is still left some money that user can cashout without the fee
            or it is equal to 0 - returns that fee is 0 */
            if (user[data.user_id].limit >= 0) {
                return 0;
            }

            /* If limit is negative converts it to positive and counts the fee from that positive
            number and sets limit to 0 */
            const temp = -user[data.user_id].limit; 
            user[data.user_id].limit = 0;
            return temp * cash_out.natural.percents/100;
        }

        if (data.user_type === "juridical") {
            const fee = data.operation.amount * cash_out.juridical.percents/100;

            // If calculated fee is lower than min fee returs min fee
            if (fee < cash_out.juridical.min.amount){ 
                return cash_out.juridical.min.amount;
            }

            // If greater returns calculated fee
            return fee; 
        }
    }
}

function roundFee (fee) { 
    return Math.ceil(fee*100)/100;
}

// Gets filename from given argument
const filename = process.argv.slice(2); 

const fs = require('fs');

// Reads the data file and prints the results
fs.readFile(filename[0], (err, inputData) => {  
    if (err) throw err;
    const data = JSON.parse(inputData);

    // Array for saving users obj
    const user = [];

    // Loop for calculating and printing fees of all given operations
    for (let i = 0; i<data.length ; i++)
        console.log(roundFee(feeCalculation(data[i], user)).toFixed(2));

});

