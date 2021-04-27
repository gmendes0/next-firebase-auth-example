import { SyntheticEvent, useRef, useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
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
    boxShadow: theme.shadows[20],
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  formButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const Login: React.FC = () => {
  // TODO: change sign in methods

  const styles = useStyles();

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

    try {
      setError("");
      setIsLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError("Failed to create an account");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
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
              <Button
                type="submit"
                className={styles.formButton}
                variant="contained"
                size="large"
                color="primary"
                disabled={isLoading}
              >
                Sign In
              </Button>
            </Box>
          </Box>
          <Box>
            <Typography variant="body2">
              Don't have an account yet?{" "}
              <NextLink href="/signup">
                <Link style={{ cursor: "pointer" }}>Sign Up</Link>
              </NextLink>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
