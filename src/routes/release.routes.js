const express = require("express");
const releaseController = require("../controllers/release.controller");

const router = express.Router();

router.get("/", releaseController.getAll);
router.post("/", releaseController.create);
router.put("/:id", releaseController.update);
router.delete("/:id", releaseController.delete);

module.exports = router;