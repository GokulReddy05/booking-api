import express from "express";
import { createBooking, getBookings, getBookingById, deleteBooking, updateBookingController } from "../controllers/bookingController.js";
const router = express.Router();

router.post('/bookings', createBooking);
router.get('/bookings', getBookings);
router.get('/bookings/:id', getBookingById);
router.delete('/bookings/:id', deleteBooking);
router.patch("/:id", updateBookingController);

export default router;