const admin = require("firebase-admin");

admin.initializeApp();

const {onReservationCreated} = require("./notifications");

exports.onReservationCreated = onReservationCreated;
