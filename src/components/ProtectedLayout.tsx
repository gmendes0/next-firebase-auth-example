import {
  AppBar,
  Box,
  Button,
  Container,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Unauthorized from "./Unauthorized";

type IProps = {
  children: ReactNode;
};

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  appBarTitle: {
    fontWeight: 600,
  },
  main: {
    position: "relative",
  },
  alertBox: {
    position: "absolute",
    top: 80,
    right: 20,
  },
}));

export default function ProtectedLayout({ children }: IProps) {
  const styles = useStyles();

  const router = useRouter();
  const { currentUser, logout } = useAuth();

  const [error, setError] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) router.push("/login");
  }, [currentUser]);

  if (!currentUser) {
    return <Unauthorized />;
  }

  async function handleLogout() {
    setErrorOpen(false);
    setError("");

    try {
      await logout();

      router.push("/login");
    } catch (error) {
      setError("Failed to log out");
      setErrorOpen(true);
    }
  }

  return (
    <>
      <header>
        <AppBar>
          <Toolbar className={styles.toolbar}>
            <Box>
              <Typography className={styles.appBarTitle} component="h1">
                Dashboard
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </header>
      <Box className={styles.main} component="main">
        {error && errorOpen && (
          <Alert
            className={styles.alertBox}
            severity="error"
            onClose={() => setErrorOpen(false)}
          >
            {error}
          </Alert>
        )}
        {children}
      </Box>
    </>
  );
}
