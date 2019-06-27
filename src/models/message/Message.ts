import * as mongoose from 'mongoose';
const MessageSchema = new mongoose.Schema({
    _id: String,
    creator_id: String,
    description: String
});

const MessageModel = mongoose.model('Message', MessageSchema);

export { MessageModel }
