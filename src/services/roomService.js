import  prisma  from "../config/prisma.js";

export const roomCreateService = async ({ name, capacity, location }) => {
    try {
        const createNewRoom = await prisma.room.create({
            data: {
                name,
                capacity,
                location
            }
        });

        return createNewRoom;
    } catch (error) {
        console.error("Prisma Error:", error);
        throw new Error("Failed to create room");
    }
};

export const getRoomService = async()=>{
    try{
        const getRoom = await prisma.room.findMany();
        return getRoom;
    }catch(error){
        console.error("Prisma Error:", error);
        throw new Error("Failed to fetch room");
    }   
}

export const getRoomByIdService = async(id)=>{
    try{
        const room = await prisma.room.findUnique({
            where: { id: parseInt(id) }
        });
        return room;
    }catch(error){
        console.error("Prisma Error:", error);
        throw new Error("Failed to fetch room by ID");
    }   
}

export const deleteRoomService = async(id)=>{
    try{
        const deletedRoom = await prisma.room.delete({
            where: { id: parseInt(id) }
        });
        return deletedRoom;
    }catch(error){
        console.error("Prisma Error:", error);
        throw new Error("Failed to delete room");
    }   
}