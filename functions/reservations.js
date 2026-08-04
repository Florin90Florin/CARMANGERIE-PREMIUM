const {onCall, HttpsError} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

exports.createReservation = onCall(async (request) => {
  const reservation = request.data;

  if (!reservation || typeof reservation !== "object") {
    throw new HttpsError(
        "invalid-argument",
        "Datele rezervării lipsesc.",
    );
  }

  const {
    id,
    offerId,
    locationId,
    name,
    phone,
    quantity,
  } = reservation;

  if (
    !id ||
        !offerId ||
        !locationId ||
        !name ||
        !phone
  ) {
    throw new HttpsError(
        "invalid-argument",
        "Datele rezervării sunt incomplete.",
    );
  }

  const requestedQuantity = Number(quantity);

  if (!Number.isFinite(requestedQuantity) || requestedQuantity <= 0) {
    throw new HttpsError(
        "invalid-argument",
        "Cantitatea este invalidă.",
    );
  }

  const db = admin.firestore();

  const offerRef = db.collection("offers").doc(offerId);
  const reservationRef = db.collection("reservations").doc(id);

  try {
    await db.runTransaction(async (transaction) => {
      const offerSnap = await transaction.get(offerRef);

      if (!offerSnap.exists) {
        throw new HttpsError(
            "not-found",
            "Oferta nu mai există.",
        );
      }

      const offer = offerSnap.data();
      const currentStock = Number(offer.stock || 0);
      const offerLimit = Number(offer.limit || 0);

      if (offer.active !== true) {
        throw new HttpsError(
            "failed-precondition",
            "Oferta nu mai este activă.",
        );
      }

      if (offer.locationId !== locationId) {
        throw new HttpsError(
            "permission-denied",
            "Magazinul rezervării nu corespunde ofertei.",
        );
      }

      if (
        !Number.isFinite(currentStock) ||
                requestedQuantity > currentStock
      ) {
        throw new HttpsError(
            "failed-precondition",
            "Stoc insuficient.",
        );
      }

      if (
        Number.isFinite(offerLimit) &&
                offerLimit > 0 &&
                requestedQuantity > offerLimit
      ) {
        throw new HttpsError(
            "failed-precondition",
            "Cantitatea depășește limita ofertei.",
        );
      }

      const newStock = +(
        currentStock - requestedQuantity
      ).toFixed(2);

      transaction.update(offerRef, {
        stock: newStock,
      });

      transaction.create(reservationRef, {
        ...reservation,

        // Valorile critice sunt impuse de server.
        offerId: offerSnap.id,
        locationId: offer.locationId,
        product: offer.name,
        quantity: requestedQuantity,
      });
    });

    return {
      success: true,
      reservationId: id,
    };
  } catch (error) {
    console.error("createReservation error:", error);

    if (error instanceof HttpsError) {
      throw error;
    }

    throw new HttpsError(
        "internal",
        "Rezervarea nu a putut fi creată.",
    );
  }
});
