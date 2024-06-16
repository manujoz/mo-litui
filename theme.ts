import { MjoThemeConfig } from "./src/types/mjo-theme";

export const theme: MjoThemeConfig = {
    radiusLarge: "10px",
    radiusMedium: "5px",
    radiusSmall: "3px",
    fontSizeLarge: "24px",
    fontSizeMedium: "16px",
    fontSizeSmall: "14px",
    fontWeightBold: "700",
    fontWeightLight: "300",
    fontWeightMedium: "500",
    fontWeightRegular: "400",
    spaceLarge: "24px",
    spaceMedium: "16px",
    spaceSmall: "8px",
    spaceXLarge: "32px",
    spaceXXLarge: "48px",
    dark: {
        primaryColor: {
            default: "#16c97c",
            "50": "#e8faf2",
            "100": "#d0f4e5",
            "200": "#a2e9cb",
            "300": "#73dfb0",
            "400": "#45d496",
            "500": "#16c97c",
            "600": "#14b570",
            "700": "#0f8d57",
            "800": "#0b653e",
            "900": "#073c25",
        },
        secondaryColor: "#f0a34b",
        foregroundColor: "#ffffff",
    },
    components: {
        mjoButton: {
            fontSize: "30px",
        },
    },
};
