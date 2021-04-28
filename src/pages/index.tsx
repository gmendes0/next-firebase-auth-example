import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  makeStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProtectedLayout from "../components/ProtectedLayout";
import ProfileCardInfo from "../components/ProfileCardInfo";
import Unauthorized from "../components/Unauthorized";
import { useAuth } from "../context/AuthContext";
import Head from "next/head";

const useStyles = makeStyles(theme => ({
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
      <Head>
        <title>Home</title>
      </Head>
      <ProtectedLayout>
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
                onClick={() => router.push("/profile/update")}
              >
                Update Profile
              </Button>
            </CardActions>
          </Card>
        </Container>
      </ProtectedLayout>
    </>
  );
}
