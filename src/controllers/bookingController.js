import { createBookingService, getBookingsService,getBookingByIdService,deleteBookingService,updateBookingService } from "../services/bookingService.js";

export const createBooking = async(req,res)=>{
    const {userId, roomId, startTime, endTime} = req.body;
    try{
        const newBooking = await createBookingService({userId, roomId, startTime, endTime});
        res.status(201).json(newBooking);
    }catch(err){
        console.error(err);
        res.status(500).json({message: err.message});
    }
}

export const getBookings = async(req,res)=>{

    try{
        const bookings = await getBookingsService();
        res.status(200).json(bookings);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: err.message});
    }
}


export const getBookingById = async(req,res)=>{
   const {id} = req.params;
    try{
        const booking = await getBookingByIdService(id);
        res.status(200).json(booking);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: err.message});
    }
}

export const deleteBooking = async(req,res)=>{
    const {id} = req.params;
    try{
        const deletedBooking = await deleteBookingService(id);
        res.status(200).json(deletedBooking);
    }catch(err){
        console.error(err);
        res.status(500).json({message: err.message});
    }
}


export const updateBookingController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { startTime, endTime } = req.body;

    const updatedBooking = await updateBookingService(id, {
      startTime,
      endTime
    });

    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking
    });
  } catch (error) {
    next(error);
  }
};
