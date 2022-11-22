import mongoose from 'mongoose';
const { Schema } = mongoose;

const roomsSchema = new Schema({
    name: String,
    roomId: String,
    // connecting room to a user
    userId: String,
})

export default mongoose.model('Room', roomsSchema);