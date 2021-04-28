import NextLink from "next/link";
import {
  Box,
  Button,
  CircularProgress,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { SyntheticEvent, useRef, useState } from "react";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../context/AuthContext";
import Head from "next/head";

const useStyles = makeStyles(theme => ({
  formContainer: {
    padding: "25px 25px",
    [theme.breakpoints.between("xs", "sm")]: {
      width: 335,
    },
    [theme.breakpoints.up("sm")]: {
      width: 375,
    },
    boxShadow: theme.shadows[7],
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  buttonWrapper: {
    width: "100%",
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    right: "50%",
    marginTop: -10, // Metade do tamanho
    marginRight: -10 - 95, // Metade do tamanho - margem
    color: theme.palette.text.disabled,
  },
  formButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  signUpTextContainer: {
    marginTop: theme.spacing(2),
  },
}));

export default function ForgotPassword() {
  const styles = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const emailRef = useRef<HTMLInputElement>();

  const { resetPassword } = useAuth();

  async function handleSubmit(event: SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!emailRef.current.value) return setError("Please fill out all fields");

    try {
      setError("");
      setMessage("");
      setIsLoading(true);

      await resetPassword(emailRef.current.value);
      setMessage("We've sent a password reset link to this email address");
    } catch (error) {
      setError("Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100vw"
        height="100vh"
      >
        <Box
          className={styles.formContainer}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography className={styles.title} component="h1" variant="h5">
            Reset Password
          </Typography>
          {error && (
            <Alert severity="error" variant="standard">
              {error}
            </Alert>
          )}
          {message && (
            <Alert severity="success" variant="standard">
              {message}
            </Alert>
          )}
          <Box width="100%">
            <Box
              display="flex"
              flexDirection="column"
              width="100%"
              component="form"
              onSubmit={handleSubmit}
            >
              <TextField
                variant="outlined"
                margin="normal"
                type="email"
                label="Email"
                inputRef={emailRef}
                required
              />
              <div className={styles.buttonWrapper}>
                <Button
                  type="submit"
                  className={styles.formButton}
                  variant="contained"
                  size="large"
                  color="primary"
                  disabled={isLoading}
                  fullWidth
                >
                  Reset Password
                </Button>
                {isLoading && (
                  <CircularProgress
                    className={styles.buttonProgress}
                    size={20}
                  />
                )}
              </div>
              <NextLink href="/login">
                <Link style={{ cursor: "pointer" }}>
                  <Typography align="center" variant="body1">
                    Login
                  </Typography>
                </Link>
              </NextLink>
            </Box>
          </Box>
        </Box>

        <Box className={styles.signUpTextContainer}>
          <Typography variant="body1">
            Don't have an account yet?{" "}
            <NextLink href="/signup">
              <Link style={{ cursor: "pointer" }}>Sign Up</Link>
            </NextLink>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
