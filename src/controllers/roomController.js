import {roomCreateService, getRoomService,getRoomByIdService, deleteRoomService} from "../services/roomService.js";

export const createRoom = async(req,res)=>{
    const { name, capacity, location } = req.body;
    try{
        const newRoom = await roomCreateService({ name, capacity, location });
       res.status(201).json({ message: "Room created successfully", room: newRoom });
    }catch(error){
        console.error("Error creating room:", error);
        res.status(500).json({ message: "Failed to create room", error: error.message });
    }
}

export const getRoom = async(req,res)=>{
     try{
    const getRoom = await getRoomService();
    res.status(200).json({ room: getRoom });
     }catch(error){
        console.error("Error fetching room:", error);
        res.status(500).json({ message: "Failed to fetch room", error: error.message });
    }
}

export const getRoomById = async(req,res)=>{
    const { id } = req.params;
    try{
        const room = await getRoomByIdService(id);
        if(!room){
            return res.status(404).json({ message: "Room not found" });
        }
        res.status(200).json({ room });
    }catch(error){
        console.error("Error fetching room by ID:", error);
        res.status(500).json({ message: "Failed to fetch room by ID", error: error.message });
    }   
}

export const deleteRoom = async(req,res)=>{
    const { id } = req.params;
    try{
        const deletedRoom = await deleteRoomService(id);
        if(!deletedRoom){
            return res.status(404).json({ message: "Room not found" });
        }
        res.status(200).json({ message: "Room deleted successfully" });
    }catch(error){
        console.error("Error deleting room:", error);
        res.status(500).json({ message: "Failed to delete room", error: error.message });
    }
}