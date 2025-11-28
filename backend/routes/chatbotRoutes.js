const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbotController");

// GET all FAQs
router.get("/", chatbotController.getFaqs);

module.exports = router;
