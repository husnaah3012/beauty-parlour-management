const Appointment = require("../models/Appointment");
const sendEmail = require("../utils/emailService");
const User = require("../models/User");



const createAppointment = async (req, res) => {
    try {
        const { service, date } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const appointment = await Appointment.create({
            userId: req.user.id,
            service,
            date
        });

        await sendEmail(
            user.email,
            "Appointment Confirmation",
            `Hello ${user.name},

Your appointment has been booked successfully.

Service: ${service}
Date: ${date}

Thank you for choosing our Beauty Parlour.`
        );

        res.status(201).json({
            message: "Appointment booked successfully",
            appointment
        });

    } catch (error) {
        console.log("APPOINTMENT ERROR:", error);

        res.status(500).json({
            message: "Failed to create appointment"
        });
    }
};



const getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({
            userId: req.user.id
        }).sort({ date: 1 });

        res.status(200).json({
            appointments
        });

    } catch (error) {
        console.log("APPOINTMENT ERROR:", error);

        res.status(500).json({
            message: "Failed to fetch appointments"
        });
    }
};



const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("userId", "name email")
            .sort({ date: 1 });

        res.status(200).json({
            appointments
        });

    } catch (error) {
        console.log("APPOINTMENT ERROR:", error);

        res.status(500).json({
            message: "Failed to fetch all appointments"
        });
    }
};



const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["pending", "confirmed", "cancelled"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            {
                status: status
            },
            {
                new: true
            }
        );

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        res.status(200).json({
            message: "Appointment status updated successfully",
            appointment
        });

    } catch (error) {
        console.log("APPOINTMENT ERROR:", error);

        res.status(500).json({
            message: "Failed to update appointment status"
        });
    }
};



const updatePaymentStatus = async (req, res) => {
    try {
        const { transactionId } = req.body;

        if (!transactionId) {
            return res.status(400).json({
                message: "Transaction ID is required"
            });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            {
                paymentStatus: "paid",
                transactionId: transactionId
            },
            {
                new: true
            }
        );

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        res.status(200).json({
            message: "Demo payment successful",
            appointment
        });

    } catch (error) {
        console.log("PAYMENT ERROR:", error);

        res.status(500).json({
            message: "Failed to update payment"
        });
    }
};


module.exports = {
    createAppointment,
    getMyAppointments,
    getAllAppointments,
    updateAppointmentStatus,
    updatePaymentStatus
};