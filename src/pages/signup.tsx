import { SyntheticEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Head from "next/head";
import {
  Box,
  Button,
  CircularProgress,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../context/AuthContext";

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
    marginRight: -10 - 50, // Metade do tamanho menos margem
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

const SignupCard: React.FC = () => {
  const styles = useStyles();
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const passwordConfirmationRef = useRef<HTMLInputElement>();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signup, currentUser } = useAuth();

  async function handleSubmit(event: SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (
      !passwordRef.current.value ||
      !passwordConfirmationRef.current.value ||
      !emailRef.current.value
    )
      return setError("Please, fill out all fields");

    if (passwordRef.current.value !== passwordConfirmationRef.current.value)
      return setError("Passwords do not match");

    try {
      setError("");
      setIsLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      router.push("/");
    } catch (error) {
      setError("Failed to create an account");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100vw"
        height="100vh"
      >
        {currentUser && JSON.stringify(currentUser.email)}
        <Box
          className={styles.formContainer}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography className={styles.title} component="h1" variant="h5">
            Sign In
          </Typography>
          {error && (
            <Alert severity="error" variant="standard">
              {error}
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
              <TextField
                variant="outlined"
                margin="normal"
                type="password"
                label="Password"
                inputRef={passwordRef}
                required
              />
              <TextField
                variant="outlined"
                margin="normal"
                type="password"
                label="Password Confirmation"
                inputRef={passwordConfirmationRef}
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
                  Sign Up
                </Button>
                {isLoading && (
                  <CircularProgress
                    className={styles.buttonProgress}
                    size={20}
                  />
                )}
              </div>
            </Box>
          </Box>
        </Box>
        <Box className={styles.signUpTextContainer}>
          <Typography variant="body2">
            Already have an account?{" "}
            <NextLink href="/login">
              <Link style={{ cursor: "pointer" }}>Log In</Link>
            </NextLink>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default SignupCard;
