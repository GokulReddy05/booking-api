import  prisma  from "../config/prisma.js";

export const availabilityCheckService = async (roomId, startTime, endTime, db=prisma, excludeBookingId=null) => {
    try {
        const requestedStart = new Date(startTime);
        const requestedEnd = new Date(endTime);
        // Check if the room exists
        const room = await db.room.findUnique({
            where: { id: parseInt(roomId) }
        });
        if (!room) {
            throw new Error("Room not found");
        }

        // Check for existing bookings in the specified time range
        const conflictingBookings = await db.booking.findFirst({
            where: {
                roomId: parseInt(roomId),
                startTime: { lt: requestedEnd },
                endTime: { gt: requestedStart },
                status: "Confirmed" ,

                ...(excludeBookingId != null && { id: { not: parseInt(excludeBookingId) } })
            }
        });

        return !conflictingBookings; // Return true if no conflicting bookings, false otherwise
    } catch (error) {
        console.error("Error checking room availability:", error);
        throw new Error("Failed to check room availability");
    }
};