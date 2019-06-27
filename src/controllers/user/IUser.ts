import {ITokens} from "./ITokens";

export interface IUser {
    registration(email: string, userName: string, password: string): Promise<void>;
    login(email: string, password: string): Promise<ITokens>;
    refreshTokens(refreshToken: string) : Promise<any>;
    changeUserName(email: string, password: string): Promise<any>;
}
