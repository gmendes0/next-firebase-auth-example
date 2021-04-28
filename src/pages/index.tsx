import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProfileCardInfo from "../components/ProfileCardInfo";
import Unauthorized from "../components/Unauthorized";
import { useAuth } from "../context/AuthContext";

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  appBarTitle: {
    fontWeight: 600,
  },
  mainContainer: {
    paddingTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  card: {
    width: 350,
    minWidth: 275,
  },
  updateProfileButton: {
    fontWeight: 700,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function Home() {
  const styles = useStyles();
  const router = useRouter();

  const [error, setError] = useState("");

  const { currentUser, logout } = useAuth();

  useEffect(() => {
    if (!currentUser) router.push("/login");
  }, [currentUser]);

  if (!currentUser) {
    return <Unauthorized />;
  }

  async function handleLogout() {
    setError("");

    try {
      await logout();

      router.push("/login");
    } catch (error) {
      setError("Failed to log out");
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
      <Box component="main">
        <Container className={styles.mainContainer}>
          {error && (
            <Alert
              severity="error"
              style={{
                marginBottom: 15,
              }}
            >
              {error}
            </Alert>
          )}
          <Card className={styles.card}>
            <CardContent>
              <ProfileCardInfo label="Email" info={currentUser.email} isFirst />
            </CardContent>
            <CardActions>
              <Button
                className={styles.updateProfileButton}
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => router.push("/profile")}
              >
                Update Profile
              </Button>
            </CardActions>
          </Card>
        </Container>
      </Box>
    </>
  );
}
