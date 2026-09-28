const express = require ("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

const adminMiddleware = require("../middlewares/adminMiddleware");

router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        message:"Profile accessed successfully",
        user:req.user
    });
});

router.get("/admin", authMiddleware,adminMiddleware, (req, res) => {
    res.status(200).json({
        message:"Welcome Admin"
    });
});

module.exports = router;

