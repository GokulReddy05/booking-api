import { availabilityCheckService } from '../services/roomavailabilityService.js';

export const availabilityCheck = async (req, res) => {
    const { id } = req.params;
    const { startTime, endTime } = req.query;
    try {
        const isAvailable = await availabilityCheckService(id, startTime, endTime);
        res.status(200).json({ available: isAvailable });
    }
    catch (error) {
        console.error("Error in availabilityCheck controller:", error);
        res.status(500).json({ message: "Failed to check room availability" });
    }
}