import {ITheme} from "./ITheme";
import {IThemeModel} from "../../models/theme/IThemeModel";

export class Theme implements ITheme{
    createNewTheme(tokenArg: string, nameOfTheme: string): Promise<void> {
        return undefined;
    }

    deleteTheme(tokenArf: string, tokenId: string): Promise<void> {
        return undefined;
    }

    getThemes(numberOfPage: number): Promise<IThemeModel[]> {
        return undefined;
    }

    refreshTheme(tokenArf: string, tokenId: string): Promise<any> {
        return undefined;
    }
}
