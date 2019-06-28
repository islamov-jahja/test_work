import {BodyProp, Controller, Delete, Post, Put} from "tsoa";
import {ITheme} from "./ITheme";
import {checkAuth} from "../../middleware/auth";
import {Theme} from "./Theme";

export class ThemeController extends Controller {
    private theme: ITheme = new Theme();

    @Post('/theme')
    public async createTheme(@BodyProp() tokenArg: string, @BodyProp() nameOfTheme: string): Promise<string> {
        try{
            checkAuth(tokenArg);
            await this.theme.createNewTheme(tokenArg, nameOfTheme);
            this.setStatus(200);
            return "тема создана";
        }catch (e) {
            this.setStatus(400);
            return e.message;
        }
    }

    @Delete('/theme/:id')
    public async deleteTheme(@BodyProp() tokenArg: string, @BodyProp() id: string): Promise<string> {
        try{
            checkAuth(tokenArg);
            await this.theme.deleteTheme(tokenArg, id);
            this.setStatus(200);
            return "тема удалена";
        }catch (e) {
            this.setStatus(400);
            return e.message;
        }
    }

    @Put('/theme/:id')
    public async refreshTheme(@BodyProp() tokenArg: string, @BodyProp() id: string, @BodyProp() newNameOfTheme: string): Promise<string> {
        try{
            checkAuth(tokenArg);
            await this.theme.refreshTheme(tokenArg, id, newNameOfTheme);
            this.setStatus(200);
            return "тема изменена";
        }catch (e) {
            this.setStatus(400);
            return e.message;
        }
    }

}
