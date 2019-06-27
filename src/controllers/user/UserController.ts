import { Controller, Route, Get, Post, BodyProp, Put, Delete } from 'tsoa';
import  { User } from './User';
import {checkAuth} from './../../middleware/auth';

@Route('/todo')
export class UserController extends Controller {
    /*@Get()
    public async getAll(): Promise<ITodo[]> {
        try {
            let items: any = await TodoModel.find({});
            items = items.map((item) => { return {id: item._id, description: item.description}});
            return items;
        } catch (err) {
            this.setStatus(500);
            console.error('Caught error', err);
        }
    }*/

    @Post('/user')
    public async registrationOfUser(@BodyProp() email: string, @BodyProp() userName: string, @BodyProp() password: string ) : Promise<string> {
        const user = new User;
        try {
            await user.registration(email, userName, password);
            this.setStatus(200);
            return "Регистрация успешно пройдена";
        }catch (e) {
            this.setStatus(400);
            return e.message;
        }

    }

    @Post('/user/login')
    public async login(@BodyProp() email: string, @BodyProp() password: string ) : Promise<Object> {
        const user = new User;
        try {
            const result = await user.login(email, password);
            this.setStatus(200);
            return {token: result};
        }catch (e) {
            this.setStatus(400);
            return e.message;
        }
    }

    @Post('/user/refresh')
    public async refreshTokens(refreshToken: string):Promise<Object>
    {
        const user = new User;
        try {
            const result = await user.refreshTokens(refreshToken);
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
        const user = new User;
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

    /*@Put('/{id}')
    public async update(id: string, @BodyProp() description: string) : Promise<void> {
        await TodoModel.findOneAndUpdate({_id: id}, {description: description});
    }*/

    /*@Delete('/{id}')
    public async remove(id: string) : Promise<void> {
        await TodoModel.findByIdAndRemove(id);
    }*/
}
