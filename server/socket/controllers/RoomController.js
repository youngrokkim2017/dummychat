import BaseController from "./BaseController.js";

class RoomController extends BaseController {
    joinRoom = ({ roomId }) => {
        this.socket.join(roomId)
    }
}

export default RoomController;