import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchModal, initializLogin, authLogout } from "../store/loginSlice";
const Login = () => {
  const dispatch = useDispatch();
  const { webauth, provider, status, information } = useSelector(
    (state) => state.login
  );
  console.log("webauth, provider, status", webauth, provider, status);
  useEffect(() => {
    dispatch(fetchModal());
    // if (webauth) {
    //   console.log("webauth yes");
    //   // webauth.initModal();
    //   // dispatch(initializeModal(webauth));
    // }
    console.count();
  }, [dispatch]);
  const handleLogout = async () => {
    await webauth.logout();
    dispatch(authLogout());
  };
  const loggedInView = (
    <>
      Logged in
      <button onClick={handleLogout} className="card">
        Logout
      </button>
      {JSON.stringify(information)}
    </>
  );
  const handleLogin = () => {
    console.log("inside login ");
    dispatch(initializLogin(webauth));
  };
  const unloggedinView = (
    <>
      <button onClick={handleLogin} className="card">
        Login
      </button>
    </>
  );
  return <div className="grid">{provider ? loggedInView : unloggedinView}</div>;
};

export default Login;
