import {IThemeModel} from "../../models/theme/Theme";

export interface ITheme {
    createNewTheme(tokenArg: string, nameOfTheme: string): Promise<void>;
    deleteTheme(tokenArf: string, tokenId: string): Promise<void>;
    refreshTheme(tokenArf: string, tokenId: string) : Promise<any>;
    getThemes(numberOfPage: number): Promise<IThemeModel[]>;
}
