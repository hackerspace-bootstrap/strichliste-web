var settings = {

    /////////////////////////////////////////////////////////////////////////
    // general

    // URL to the strichliste api server
    server: 'https://demo.strichliste.org/api',

    // period from which on the user counts as inactive [false=disabled]
    // format: https://www.npmjs.com/package/ms
    inactiveUserPeriod: '30d',

    // the time of inactivity, before strichliste switches back to home screen
    // [false=disabled]
    // format: https://www.npmjs.com/package/ms
    idleTimeout: '30s',

    /////////////////////////////////////////////////////////////////////////
    // audio

    audio: {
        transaction: 'cash-register.ogg'
    },

    // For performance, one can switch the index page to a "tabbed" mode for active/inactive users
    // The users/html-elements are not rendered until the tab is opened
    index: {
        tabbed: false
    },

    /////////////////////////////////////////////////////////////////////////
    // payments

    paymentSteps: {

        // payment steps for wallet charging
        deposit: [0.50, 1.00, 2.00, 5.00, 10.00],

        // payment steps for payment
        dispense: [0.50, 1.00, 1.50, 2.00, 0.70],

        // payment steps for transfer
        transfer: [0.50, 1.00, 2.00, 5.00, 10.00],

        // enable "transfer money to somebody else" option
        wireTransfer: false,

        // enables custom transactions. If enabled, payment steps are reduced
        // to only 4 steps
        customTransactions: true

    },

    // Enable comment section for custom transfers, Requires backend >= 1.6.0
    comments: false,

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
