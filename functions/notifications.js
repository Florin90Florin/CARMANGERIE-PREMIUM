const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");


exports.onReservationCreated = onDocumentCreated(
    "reservations/{reservationId}",
    async (event) => {
      const reservation = event.data.data();

      console.log("Rezervare nouă:", reservation);

      return admin.firestore().collection("notifications").add({
        type: "new_reservation",
        title: "Rezervare nouă",
        message: `${reservation.name} a făcut o rezervare.`,
        reservationId: reservation.id,
        read: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    },
);
