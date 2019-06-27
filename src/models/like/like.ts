import * as mongoose from 'mongoose';
const LikeSchema = new mongoose.Schema({
    _id: String,
    message_id: String,
    user_id: String
});

const LikeModel = mongoose.model('Like', LikeSchema);

export { LikeModel }
