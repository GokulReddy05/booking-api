import  prisma  from "../config/prisma.js";
import { availabilityCheckService } from "./roomavailabilityService.js";
import { bookingValidation,validateBookingAdvanceWindow } from "./bookingValidation.js";


export const createBookingService = async ({
  userId,
  roomId,
  startTime,
  endTime
}) => {
  try {
    const newBooking = await prisma.$transaction(async (tx) => {

      // 1. Lock room
      await tx.$queryRaw`
        SELECT id FROM "Room"
        WHERE id = ${Number(roomId)}
        FOR UPDATE
      `;

      // 2. Validate room
      const room = await tx.room.findUnique({
        where: { id: Number(roomId) }
      });

      if (!room) throw new Error("Room not found");
      if (!room.isActive) throw new Error("Room is not active");

      // 3. Validate user
      const user = await tx.user.findUnique({
        where: { id: Number(userId) }
      });

      if (!user) throw new Error("User not found");

      // 4. Validate dates
      const bookingStartTime = new Date(startTime);
      const bookingEndTime = new Date(endTime);

      if (
        Number.isNaN(bookingStartTime.getTime()) ||
        Number.isNaN(bookingEndTime.getTime())
      ) {
        throw new Error("Invalid date format");
      }

      if (bookingStartTime >= bookingEndTime) {
        throw new Error("Start time must be before end time");
      }

      if (bookingStartTime <= new Date()) {
        throw new Error("Start time must be in the future");
      }

      await bookingValidation(bookingStartTime, bookingEndTime);
      await validateBookingAdvanceWindow(bookingStartTime);
      // 5. Check availability
      const isAvailable = await availabilityCheckService(
        roomId,
        bookingStartTime,
        bookingEndTime,
        tx
      );

      if (!isAvailable) {
        throw new Error("Room is not available");
      }

      // 6. Create booking
      return await tx.booking.create({
        data: {
          userId: Number(userId),
          roomId: Number(roomId),
          startTime: bookingStartTime,
          endTime: bookingEndTime
        }
      });
    });

    // 7. Return committed booking
    return newBooking;

  } catch (err) {
    console.error("Prisma Error:", err);
    throw err;
  }
};


export const getBookingsService = async () => {
  try {
    return await prisma.booking.findMany();
    } catch (err) { 
        throw new Error("Failed to retrieve bookings: " + err.message);
    }
};

export const getBookingByIdService = async (id) => {
    try {
        const booking = await prisma.booking.findUnique({
            where: { id: Number(id) }
        });
        if (!booking) {
            throw new Error("Booking not found");
        }
        return booking;
    } catch (err) {
        throw new Error("Failed to retrieve booking: " + err.message);
    }
};

export const deleteBookingService = async (id) => {
    try {
        const deletedBooking = await prisma.booking.delete({
            where: { id: Number(id) }
        });
        return deletedBooking;
    } catch (err) {
        throw new Error("Failed to delete booking: " + err.message);
    }
};



export const updateBookingService = async (id, { startTime, endTime }) => {
  const updatedBooking = await prisma.$transaction(async (tx) => {

    const existingBooking = await tx.booking.findUnique({
      where: { id: Number(id) }
    });

    if (!existingBooking) {
      throw new Error("Booking not found");
    }

    // Lock the Room row
    await tx.$queryRaw`
      SELECT id FROM "Room"
      WHERE id = ${existingBooking.roomId}
      FOR UPDATE
    `;

    if (existingBooking.status !== "Confirmed") {
      throw new Error("Only confirmed bookings can be updated");
    }

    const bookingStartTime = new Date(startTime);
    const bookingEndTime = new Date(endTime);

    if (
      Number.isNaN(bookingStartTime.getTime()) ||
      Number.isNaN(bookingEndTime.getTime())
    ) {
      throw new Error("Invalid date format");
    }

    if (bookingStartTime >= bookingEndTime) {
      throw new Error("Start time must be before end time");
    }

    if (bookingStartTime <= new Date()) {
      throw new Error("Start time must be in the future");
    }

    await bookingValidation(bookingStartTime, bookingEndTime);
    await validateBookingAdvanceWindow(bookingStartTime);
    const isAvailable = await availabilityCheckService(
      existingBooking.roomId,
      bookingStartTime,
      bookingEndTime,
      tx,
      existingBooking.id
    );

    if (!isAvailable) {
      throw new Error("Room is not available for the new time range");
    }

    return await tx.booking.update({
      where: { id: Number(id) },
      data: {
        startTime: bookingStartTime,
        endTime: bookingEndTime
      }
    });
  });

  return updatedBooking;
};

export const cancelBookingService = async (id) => {
  return await prisma.$transaction(async (tx) => {
    const existingBooking = await tx.booking.findUnique({
      where: { id: Number(id) }
    });
    if (!existingBooking) {
      throw new Error("Booking not found");
    }
    if (existingBooking.status !== "Confirmed") {
      throw new Error("Only confirmed bookings can be canceled");
    }
    return await tx.booking.update({
      where: { id: Number(id) },
      data: { status: "Canceled" }
    });
  });
}