import express from "express";
import { createRoom } from "../controllers/roomController.js";
import { getRoom,getRoomById,deleteRoom } from "../controllers/roomController.js";
import { availabilityCheck } from "../controllers/roomavailabilityController.js";

const router = express.Router();

router.post('/rooms',createRoom);
router.get('/rooms',getRoom);
router.get('/rooms/:id',getRoomById);
router.delete('/rooms/:id',deleteRoom);
router.get('/rooms/:id/availability',availabilityCheck);

export default router;