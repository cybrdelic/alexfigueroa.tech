import { Theme, darkTheme, lightTheme } from "../../theming/theme";
import { useTheme } from "../useTheme";

export function useAlternateTheme(): Theme {
    const theme = useTheme();

    return theme === lightTheme ? darkTheme : lightTheme;
}
