module.exports = {
    server: 'http://localhost:8080',
    audio: {
        transaction: 'cash-register.ogg'
    },
    paymentSteps: {
        deposit: [0.50, 1.00, 2.00, 5.00, 10.00],
        dispense: [0.50, 1.00, 1.50, 2.00, 2.50]
    }
};