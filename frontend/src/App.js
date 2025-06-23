import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import lightBackground from '../src/assets/wa-background-light.png';
import darkBackground from '../src/assets/wa-background-dark.jpg';
import { esES } from "@material-ui/core/locale";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import ColorModeContext from "./layout/themeContext";
import { SocketContext, SocketManager } from './context/Socket/SocketContext';

import Routes from "./routes";

const queryClient = new QueryClient();

const App = () => {
    const [locale, setLocale] = useState();

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferredTheme = window.localStorage.getItem("preferredTheme");
    const [mode, setMode] = useState(preferredTheme ? preferredTheme : prefersDarkMode ? "dark" : "light");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = createTheme(
        {
            scrollbarStyles: {
                "&::-webkit-scrollbar": {
                    width: '8px',
                    height: '8px',
					borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
                    backgroundColor: "#0073B5",
					borderRadius: "8px",
                },
            },
            scrollbarStylesSoft: {
                "&::-webkit-scrollbar": {
                    width: "8px",
					borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: mode === "light" ? "#F3F3F3" : "#333333",
					borderRadius: "8px",
                },
            },
            palette: {
                type: mode,
                primary: { main: mode === "light" ? "#f05670" : "#FFFFFF" },
sair: { main: mode === "light" ? "#f05670" : "#2e2e2e" },
vcard: { main: mode === "light" ? "#f05670" : "#555" },
textPrimary: mode === "light" ? "#f05670" : "#FFFFFF",
borderPrimary: mode === "light" ? "#f05670" : "#FFFFFF",
dark: { main: mode === "light" ? "#2e2e2e" : "#f5f5f5" },
light: { main: mode === "light" ? "#f5f5f5" : "#2e2e2e" },
tabHeaderBackground: mode === "light" ? "#f2f2f2" : "#4a4a4a",
ticketlist: mode === "light" ? "#fdfdfd" : "#2e2e2e",
optionsBackground: mode === "light" ? "#fdfdfd" : "#2e2e2e",
options: mode === "light" ? "#fdfdfd" : "#4a4a4a",
fontecor: mode === "light" ? "#f05670" : "#ffffff",
fancyBackground: mode === "light" ? "#fdfdfd" : "#2e2e2e",
bordabox: mode === "light" ? "#f2f2f2" : "#2e2e2e",
newmessagebox: mode === "light" ? "#f2f2f2" : "#2e2e2e",
inputdigita: mode === "light" ? "#ffffff" : "#4a4a4a",
contactdrawer: mode === "light" ? "#ffffff" : "#4a4a4a",
announcements: mode === "light" ? "#f0f0f0" : "#2e2e2e",
login: mode === "light" ? "#ffffff" : "#1C1C1C",
announcementspopover: mode === "light" ? "#ffffff" : "#4a4a4a",
chatlist: mode === "light" ? "#f2f2f2" : "#4a4a4a",
boxlist: mode === "light" ? "#f0f0f0" : "#4a4a4a",
boxchatlist: mode === "light" ? "#f0f0f0" : "#2e2e2e",
total: mode === "light" ? "#ffffff" : "#1f1f1f",
messageIcons: mode === "light" ? "#888888" : "#f5f5f5",
inputBackground: mode === "light" ? "#FFFFFF" : "#2e2e2e",
barraSuperior: mode === "light" ? "linear-gradient(to right, #f05670, #ff6e8c)" : "#4a4a4a",
boxticket: mode === "light" ? "#f2f2f2" : "#4a4a4a",
campaigntab: mode === "light" ? "#f0f0f0" : "#4a4a4a",
mediainput: mode === "light" ? "#f0f0f0" : "#1c1c1c",
contadordash: mode == "light" ? "#ffffff" : "#ffffff",

            },
            mode,
        },
        locale
    );

    useEffect(() => {
        const i18nlocale = localStorage.getItem("i18nextLng");
        const browserLocale =
            i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

       if (browserLocale === "esES") {
            setLocale(esES);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("preferredTheme", mode);
    }, [mode]);

// 🔐 Verificar si el token ha expirado antes de renderizar la app
const token = localStorage.getItem("token");

if (token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Date.now() / 1000;
    if (payload.exp < now) {
      localStorage.removeItem("token");
      window.location.reload(); // Redirige automáticamente a login
      return null; // Evita renderizar mientras recarga
    }
  } catch (e) {
    console.error("Token inválido o malformado:", e);
    localStorage.removeItem("token");
    window.location.reload();
    return null;
  }
}


    return (
        <ColorModeContext.Provider value={{ colorMode }}>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                  <SocketContext.Provider value={SocketManager}>
                      <Routes />
                  </SocketContext.Provider>
                </QueryClientProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;
