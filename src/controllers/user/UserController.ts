import { Controller, Route, Get, Post, BodyProp, Put, Delete } from 'tsoa';
import  { User } from './User';
import {checkAuth} from '../../middleware/auth';
import {IUser} from "./IUser";

@Route('/todo')
export class UserController extends Controller {
    private user:IUser = new User();

    @Post('/user')
    public async registrationOfUser(@BodyProp() email: string, @BodyProp() userName: string, @BodyProp() password: string ) : Promise<string> {
        try {
            await this.user.registration(email, userName, password);
            this.setStatus(200);
            return "Регистрация успешно пройдена";
        }catch (e) {
            this.setStatus(400);
            return e.message;
        }

    }

    @Post('/user/login')
    public async login(@BodyProp() email: string, @BodyProp() password: string ) : Promise<Object> {
        try {
            const result = await this.user.login(email, password);
            this.setStatus(200);
            return {token: result};
        }catch (e) {
            this.setStatus(400);
            return e.message;
        }
    }

    @Post('/user/refresh')
    public async refreshTokens(refreshToken: string):Promise<Object> {
        try {
            const result = await this.user.refreshTokens(refreshToken);
            this.setStatus(200);
            return result;
        }catch (e) {
            this.setStatus(401);
            return e.message;
        }
    }

    @Put('/user/username')
    public async changeUserName(tokenArg: string, newUserName: string):Promise<string>
    {
        const user:IUser = new User;
        try {
            checkAuth(tokenArg);
            await user.changeUserName(tokenArg, newUserName);
            this.setStatus(200);
            return "имя пользователя успешно изменена";
        }catch (e) {
            this.setStatus(401);
            return e.message;
        }
    }
}
