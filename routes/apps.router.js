const express = require("express")
const router = express.Router()

const appsController = require("../controller/apps.controller")


router.get("/", appsController.getAll)
router.get("/:id", appsController.getById)
router.post("/", appsController.create)


router.put("/", appsController.edit)
router.put("/:id", appsController.edit)


router.delete("/", appsController.delete)
router.delete("/deleteAllCaption", appsController.deleteAll)
router.delete("/:id", appsController.delete)
module.exports = router