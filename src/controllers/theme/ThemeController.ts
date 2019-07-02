import {BodyProp, Controller, Delete, Get, Post, Put} from "tsoa";
import {ITheme} from "./ITheme";
import {checkAuth} from "../../middleware/auth";
import {Theme} from "./Theme";
import {IThemeModel} from "../../models/theme/IThemeModel";

export class ThemeController extends Controller {
    private theme: ITheme = new Theme();

    @Post('/theme')
    async createTheme(@BodyProp() tokenArg: string, @BodyProp() nameOfTheme: string): Promise<void> {
        try{
            checkAuth(tokenArg);
            await this.theme.createNewTheme(tokenArg, nameOfTheme);
            this.setStatus(200);
        }catch (e) {
            this.setStatus(400);
            console.log(e.message);
        }
    }

    @Delete('/theme/:id')
    async deleteTheme(@BodyProp() tokenArg: string, @BodyProp() id: string): Promise<void> {
        try{
            checkAuth(tokenArg);
            await this.theme.deleteTheme(tokenArg, id);
            this.setStatus(200);
        }catch (e) {
            this.setStatus(400);
            console.log(e.message);
        }
    }

    @Put('/theme/:id')
    async refreshTheme(@BodyProp() tokenArg: string, @BodyProp() id: string, @BodyProp() newNameOfTheme: string): Promise<void> {
        try{
            checkAuth(tokenArg);
            await this.theme.refreshTheme(tokenArg, id, newNameOfTheme);
            this.setStatus(200);
        }catch (e) {
            this.setStatus(400);
            console.log(e.message);
        }
    }

    @Get('/theme/:id')
    async getThemes(@BodyProp() page: number): Promise<IThemeModel[]>{
        try{
            this.setStatus(200);
            return await this.theme.getThemes(page);
        }catch (e) {
            this.setStatus(400);
            console.log(e.message);
        }
    }

}
