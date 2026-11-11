export const bookingValidation = async(startTime, endTime)=>{
    const durationInMinutes = (endTime - startTime) / (1000 * 60); 
    const MIN_DURATION = 30; // Minimum duration in minutes
    const MAX_DURATION = 120; // Maximum duration in minutes

    if(durationInMinutes < MIN_DURATION || durationInMinutes > MAX_DURATION){
        throw new Error(`Booking duration must be between ${MIN_DURATION} and ${MAX_DURATION} minutes.`);
    }

}

export const validateBookingAdvanceWindow = (
  bookingStartTime
) => {
  const now = new Date();

  const MIN_NOTICE_MINUTES = 30;
  const MAX_ADVANCE_DAYS = 90;

  const noticeMinutes =
    (bookingStartTime.getTime() - now.getTime()) /
    (1000 * 60);

  const advanceDays =
    (bookingStartTime.getTime() - now.getTime()) /
    (1000 * 60 * 60 * 24);

  if (noticeMinutes < MIN_NOTICE_MINUTES) {
    throw new Error(
      "Booking must be made at least 30 minutes in advance"
    );
  }

  if (advanceDays > MAX_ADVANCE_DAYS) {
    throw new Error(
      "Bookings cannot be made more than 90 days in advance"
    );
  }
};