import {IThemeModel} from "../../models/theme/IThemeModel";

export interface ITheme {
    createNewTheme(tokenArg: string, nameOfTheme: string): Promise<void>;
    deleteTheme(tokenArf: string, themeId: string): Promise<void>;
    refreshTheme(tokenArf: string, themeId: string, newNameOfTheme: string) : Promise<any>;
    getThemes(numberOfPage: number): Promise<IThemeModel[]>;
}
