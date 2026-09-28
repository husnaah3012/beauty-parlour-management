const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const upload = require("../middlewares/uploadMiddleware");

const {
    createService,
    getServices,
    updateService,
    deleteService
} = require("../controllers/serviceController");



router.get("/", getServices);



router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    upload.single("image"),
    createService
);



router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    upload.single("image"),
    updateService
);



router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteService
);


module.exports = router;