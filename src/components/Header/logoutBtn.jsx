import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import authService from "../../services/auth";

function logoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logOut()
      .then(() => dispatch(logout()))
      .catch((error) =>
        console.log("error in logout button handler :: ", error)
      );
  };

  return <button onClick={logoutHandler}>Logout</button>;
}

export default logoutBtn;
