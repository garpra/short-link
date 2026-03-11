const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlController");

router.get("/api/user/urls", urlController.getUserUrls);
router.post("/api/add/url", urlController.addUrl);
router.get("/:shortCode", urlController.getUrl);

module.exports = router;
