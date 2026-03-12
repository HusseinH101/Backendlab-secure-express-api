import express from "express"
import WebTasksController from "../controller/WebTasksController.js"

const router = express.Router()

router.get("/", WebTasksController.index)

router.get("/new", WebTasksController.createForm)

router.post("/", WebTasksController.create)

router.get("/:id/edit", WebTasksController.editForm)

router.post("/:id", WebTasksController.update)

router.post("/:id/delete", WebTasksController.delete)

router.get("/:id", WebTasksController.show)

export default router