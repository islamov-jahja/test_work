import { Controller, Route, Post, BodyProp, Put} from 'tsoa';
import  { User } from './User';
import {checkAuth} from '../../middleware/auth';
import {IUser} from "./IUser";
import {ITokens} from "./ITokens";

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

    @Post('/user/image')
    async setImage(@BodyProp() tokenArg: string, @BodyProp() path_to_file: string ) : Promise<void> {
        try {
            checkAuth(tokenArg);
            await this.user.setImage(tokenArg, path_to_file);
            this.setStatus(200);
        }catch (e) {
            this.setStatus(400);
            console.log(e.message);
        }

    }

    @Post('/user/login')
    async login(@BodyProp() email: string, @BodyProp() password: string ) : Promise<ITokens> {
        try {
            const result = await this.user.login(email, password);
            this.setStatus(200);
            return result;
        }catch (e) {
            this.setStatus(400);
            console.log(e.message);
        }
    }

    @Post('/user/refresh')
    async refreshTokens(@BodyProp() refreshToken: string):Promise<ITokens> {
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
   async changeUserName(@BodyProp() tokenArg: string, @BodyProp()  newUserName: string):Promise<void>
    {
        try {
            checkAuth(tokenArg);
            await this.user.changeUserName(tokenArg,newUserName);
            this.setStatus(200);
        }catch (e) {
            this.setStatus(400);
            console.log(e.message);
        }
    }

    @Post('user/recovery')
    async sendCodeForPasswordRecovery(@BodyProp() email: string): Promise<void>
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
    async recoveryPassword(@BodyProp() email: string,@BodyProp() newPassword: string,@BodyProp() codeForRecovery: string): Promise<void>
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
