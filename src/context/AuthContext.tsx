import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase";
import { auth } from "../services/firebase";
import { Box, CircularProgress, Typography } from "@material-ui/core";

type IAuthContext = {
  currentUser: firebase.User;
  signup: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
};

export const AuthContext = createContext({} as IAuthContext);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User>();
  const [isLoading, setIsLoading] = useState(true);

  function signup(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    /**
     * Como limpar depos do effect
     */
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signup }}>
      {isLoading ? (
        <Box
          width="100vw"
          height="100vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size={40} />
          <Typography
            style={{ marginTop: 15, fontWeight: 600 }}
            color="textSecondary"
          >
            Authorizing...
          </Typography>
        </Box>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
