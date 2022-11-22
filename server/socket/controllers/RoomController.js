import BaseController from "./BaseController.js";
import Room from '../../models/Room.js';

class RoomController extends BaseController {
    joinRoom = ({ roomId }) => {
        this.socket.join(roomId)
    }
    
    newRoomCreated = ({ roomId, userId }) => {
        const room = new Room({
            name:'Test',
            roomId,
            // connecting room to a user
            userId,
        })
        room.save()
        // this.socket.broadcast.emit('new-room-created', room)
        this.socket.emit('new-room-created', { room })
    }

    roomRemoved = async ({ roomId }) => {
        await Room.deleteOne({ roomId: req.params.roomId });
        // this.socket.broadcast.emit('room-removed', { roomId })
        this.socket.emit('room-removed', { roomId })
    }
}

export default RoomController;