import { Controller, Route, Get, Post, BodyProp, Put, Delete } from 'tsoa';
import  { User } from './User';
import {checkAuth} from '../../middleware/auth';
import {IUser} from "./IUser";

@Route('/todo')
export class UserController extends Controller {
    private user:IUser = new User();

    @Post('/user')
    public async registrationOfUser(@BodyProp() email: string, @BodyProp() userName: string, @BodyProp() password: string ) : Promise<void> {
        try {
            await this.user.registration(email, userName, password);
            this.setStatus(200);
        }catch (e) {
            this.setStatus(400);
            console.log(e.message);
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
            console.log(e.message);
        }
    }

    @Post('/user/refresh')
    public async refreshTokens(refreshToken: string):Promise<Object> {
        try {
            const result = await this.user.refreshTokens(refreshToken);
            this.setStatus(200);
            return result;
        }catch (e) {
            this.setStatus(400);
            console.log(e.message);
        }
    }

    @Put('/user/username')
    public async changeUserName(tokenArg: string, newUserName: string):Promise<void>
    {
        try {
            checkAuth(tokenArg);
            await this.user.changeUserName(tokenArg, newUserName);
            this.setStatus(200);
        }catch (e) {
            this.setStatus(400);
            console.log(e.message);
        }
    }

    @Post('user/recovery')
    public async sendCodeForPasswordRecovery(email: string): Promise<void>
    {
        try {
            await this.user.senMailWithRecoveryCode(email);
            this.setStatus(200);
        }catch (e) {
            this.setStatus(400);
            console.log(e.message);
        }
    }

    @Put('user/recovery')
    public async recoveryPassword(email: string, newPassword: string, codeForRecovery: string): Promise<void>
    {
        try {
            await this.user.recoveryPassword(email, newPassword, codeForRecovery);
            this.setStatus(200);
        }catch (e) {
            this.setStatus(400);
            console.log(e.message);
        }
    }
}
