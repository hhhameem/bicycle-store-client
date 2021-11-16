import { useEffect, useState } from "react";
import {
  getAuth,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import useToastify from "./useToastify";
const axios = require("axios");

function useFirebase() {
  const { toastSuccess } = useToastify();
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();

  const emailRegistration = (email, password, name, history, from) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUserName(name);
        setUser(userCredential.user);
        saveUser(name, email);
        history.push(from);
        toastSuccess("registration successfull");
      })
      .catch((error) => {})
      .finally(() => setIsLoading(false));
  };

  const emailLogin = (email, password, history, from) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        history.push(from);
      })
      .catch((error) => {})
      .finally(() => setIsLoading(false));
  };

  const googleLogin = (history, from, fromLogin) => {
    setIsLoading(true);
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        setUser(userCredential.user);
        saveGoogleUser(
          userCredential.user.displayName,
          userCredential.user.email
        );
        if (fromLogin) {
          history.push(from);
        } else {
          history.push("/");
        }
      })
      .catch((error) => {})
      .finally(() => setIsLoading(false));
  };

  const setUserName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {})
      .catch((error) => {});
  };

  const logout = () => {
    setIsLoading(true);
    localStorage.removeItem("admin");
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {})
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
  }, [auth]);

  useEffect(() => {
    axios
      .get(
        `https://aqueous-escarpment-00747.herokuapp.com/user?email=${user.email}`
      )
      .then(function (response) {
        setIsAdmin(response.data.admin);
        if (response.data.admin) {
          localStorage.setItem("admin", true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [user.email]);

  const saveUser = (name, email) => {
    const userData = { name: name, email: email };
    axios
      .post("https://aqueous-escarpment-00747.herokuapp.com/user", userData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const saveGoogleUser = (name, email) => {
    const userData = { name: name, email: email };
    axios
      .put("https://aqueous-escarpment-00747.herokuapp.com/user", userData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return {
    user,
    isAdmin,
    isLoading,
    emailRegistration,
    emailLogin,
    googleLogin,
    logout,
  };
}

export default useFirebase;
