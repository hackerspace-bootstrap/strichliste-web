var ms = require('ms');

module.exports = {

    /////////////////////////////////////////////////////////////////////////
    // general

    // URL to the strichliste api server
    server: 'http://localhost:8080',

    // period from which on the user counts as inactive [false=disabled]
    inactiveUserPeriod: ms('30d'),

    // the time of inactivity, before strichliste switches back to home screen
    // [false=disabled]
    idleTimeout: ms('30s'),

    /////////////////////////////////////////////////////////////////////////
    // audio

    audio: {
        transaction: 'cash-register.ogg'
    },

    /////////////////////////////////////////////////////////////////////////
    // payments

    paymentSteps: {

        // payment steps for wallet charging
        deposit: [0.50, 1.00, 2.00, 5.00, 10.00],

        // payment steps for payment
        dispense: [0.50, 1.00, 1.50, 2.00, 0.70],

        // enables custom transactions. If enabled, payment steps are reduced
        // to only 4 steps
        customTransactions: true
    },

    /////////////////////////////////////////////////////////////////////////
    // i18n section

    i18n: {

        // date formatting
        dateFormat: 'YYYY-MM-DD HH:mm:ss',

        // the timezone in which the date is shown [auto=browser locale]
        // Possible value might be 'Europe/Berlin'. For a full list
        // visit: https://github.com/moment/moment-timezone/blob/develop/data/meta/latest.json
        timezone: 'auto',

        // preferred language of strichliste
        preferredLanguage: 'en',

        // your currency
        currency: "€"
    }
};