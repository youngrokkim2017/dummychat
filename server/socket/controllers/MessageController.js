import BaseController from "./BaseController.js";

class MessageController extends BaseController {
    sendMessage = ({ message, roomId }) => {
        let skt = this.socket.broadcast
        skt = roomId ? skt.to(roomId) : skt
        skt.emit('message-from-server', { message })
    }
}

export default MessageController;