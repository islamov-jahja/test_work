import { Document } from 'mongoose';

interface ILikeModel extends Document {
    _id: string;
    message_id: string;
    email: string;
}

export {ILikeModel};
