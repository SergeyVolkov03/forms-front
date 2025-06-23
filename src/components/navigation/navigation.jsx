import { useAuth } from "../../provider/authProvider";
import NavItem from "../nav-item/nav-item";
import "./navigation.css";

export default function Navigation() {
  const { token, setAuthToken } = useAuth();
  console.log("aaaa");

  function onClick() {
    setAuthToken();
  }

  return (
    <div className="navigation">
      <NavItem to={"/"} name={"Home"} />
      <NavItem to={"/search"} name={"Search"} />
      {token ? (
        <>
          <NavItem to={"/user-page"} name={"User page"} />
          <NavItem to={"/administration"} name={"Administration"} />
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
