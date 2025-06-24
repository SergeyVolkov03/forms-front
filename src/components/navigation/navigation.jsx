import { useEffect, useState } from "react";
import { useAuth } from "../../provider/authProvider";
import NavItem from "../nav-item/nav-item";
import { jwtDecode } from "jwt-decode";
import "./navigation.css";
import { getUser } from "../../api/api";

export default function Navigation() {
  const { token, setAuthToken } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      const userId = jwtDecode(token).userId;
      getUser(userId, token)
        .then((res) => {
          setIsAdmin(res.data.is_admin);
        })
        .catch(() => {
          setAuthToken();
        });
    }
  }, [token]);

  function onClick() {
    setAuthToken();
  }

  return (
    <div className="navigation">
      <NavItem to={"/"} name={"Home"} />
      <NavItem to={"/search"} name={"Search"} />
      {token ? (
        <>
          <NavItem to={"/user-page"} name={"Profile"} />
          {isAdmin && <NavItem to={"/administration"} name={"Admin"} />}
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
