import { useEffect, useState } from "react";
import { useAuth } from "../../provider/authProvider";
import NavItem from "../nav-item/nav-item";
import { jwtDecode } from "jwt-decode";
import "./navigation.css";
import { getUser } from "../../api/api";

export default function Navigation() {
  const { token, setAuthToken } = useAuth();
  const [user, setUser] = useState();

  useEffect(() => {
    if (token) {
      const userId = jwtDecode(token).userId;
      getUser(userId, token)
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          setAuthToken();
          setUser();
        });
    } else {
      setUser();
    }
  }, [token]);

  function onClick() {
    setAuthToken();
    setUser();
  }

  return (
    <div className="navigation">
      <NavItem to={"/"} name={"Home"} />
      <NavItem to={"/search"} name={"Search"} />
      {user ? (
        <>
          <NavItem to={`/profile/${user.id}`} name={"Profile"} />
          {user.is_admin && <NavItem to={"/administration"} name={"Admin"} />}
          <button className="log-out" onClick={onClick}>
            Log Out
          </button>
        </>
      ) : (
        <NavItem to={"/login"} name={"Log In"} />
      )}
    </div>
  );
}
