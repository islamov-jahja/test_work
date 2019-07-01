import * as mongoose from 'mongoose';
const MessageSchema = new mongoose.Schema({
    _id: String,
    email: String,
    theme_id: String,
    description: String
});

const MessageModel = mongoose.model('Message', MessageSchema);

export { MessageModel }
