const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const {
    createAppointment,
    getMyAppointments,
    getAllAppointments,
    updateAppointmentStatus,
    updatePaymentStatus
} = require("../controllers/appointmentController");



router.post(
    "/",
    authMiddleware,
    createAppointment
);



router.get(
    "/my",
    authMiddleware,
    getMyAppointments
);



router.get(
    "/all",
    authMiddleware,
    adminMiddleware,
    getAllAppointments
);



router.put(
    "/:id/status",
    authMiddleware,
    adminMiddleware,
    updateAppointmentStatus
);



router.put(
    "/:id/payment",
    authMiddleware,
    updatePaymentStatus
);


module.exports = router;