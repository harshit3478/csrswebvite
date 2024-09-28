import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: "LOGOUT", payload: null });
    localStorage.removeItem("user");
    navigate("/login");
  };
  return { logout };
};
// what are you doing bro comeon 