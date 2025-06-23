import { Link, useLocation } from "react-router-dom";
import "./nav-item.css";

export default function NavItem({ to, name }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={isActive ? "active-link" : "link"}>
      {name}
    </Link>
  );
}
