import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase";
import { auth } from "../services/firebase";
import PageLoading from "../components/PageLoading";

type IAuthContext = {
  currentUser: firebase.User;
  signup: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
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

  function login(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout(): Promise<void> {
    return auth.signOut();
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
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {isLoading ? <PageLoading /> : children}
    </AuthContext.Provider>
  );
};
