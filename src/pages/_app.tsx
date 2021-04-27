import { useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "../theme";
import { AuthContextProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
