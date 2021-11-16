import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider/AuthContextProvider";

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
