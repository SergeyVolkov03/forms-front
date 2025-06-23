import { NavLink } from "react-router-dom";
import "./nav-item.css";

export default function NavItem({ to, name }) {
  return (
    <NavLink to={to} className="link">
      {name}
    </NavLink>
  );
}
