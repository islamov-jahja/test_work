import * as mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
    _id: String,
    email: String,
});

const TokenModel = mongoose.model('Token', TokenSchema);

export { TokenModel }
