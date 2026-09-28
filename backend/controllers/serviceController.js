const Service = require("../models/Service");


// CREATE SERVICE
const createService = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            duration
        } = req.body;

        // Cloudinary image URL
        const image = req.file
            ? req.file.path
            : "";

        const service = await Service.create({
            name,
            description,
            price,
            duration,
            image
        });

        res.status(201).json({
            message: "Service created successfully",
            service
        });

    } catch (error) {
        console.log("SERVICE ERROR:", error);

        res.status(500).json({
            message: "Failed to create service",
            error: error.message
        });
    }
};


// GET ALL SERVICES
const getServices = async (req, res) => {
    try {
        const services = await Service.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            services
        });

    } catch (error) {
        console.log("SERVICE ERROR:", error);

        res.status(500).json({
            message: "Failed to fetch services"
        });
    }
};


// UPDATE SERVICE
const updateService = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            duration
        } = req.body;

        const updateData = {
            name,
            description,
            price,
            duration
        };

        // If new image is uploaded, save Cloudinary URL
        if (req.file) {
            updateData.image = req.file.path;
        }

        const service = await Service.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        res.status(200).json({
            message: "Service updated successfully",
            service
        });

    } catch (error) {
        console.log("SERVICE ERROR:", error);

        res.status(500).json({
            message: "Failed to update service",
            error: error.message
        });
    }
};


// DELETE SERVICE
const deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(
            req.params.id
        );

        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        res.status(200).json({
            message: "Service deleted successfully"
        });

    } catch (error) {
        console.log("SERVICE ERROR:", error);

        res.status(500).json({
            message: "Failed to delete service",
            error: error.message
        });
    }
};


module.exports = {
    createService,
    getServices,
    updateService,
    deleteService
};