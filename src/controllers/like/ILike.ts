export interface ILike {
    likeMessage(tokenArg:string, message_id:string):Promise<void>;
    removeLikeFromMessage(tokenArg: string, message_id):Promise<void>;
}
