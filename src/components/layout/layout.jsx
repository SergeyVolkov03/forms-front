import { Outlet } from "react-router-dom";
import Navigation from "../navigation/navigation";
import "./layout.css";

export default function Layout() {
  return (
    <div>
      <header className="header">
        <div className="logo">Forms</div>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
}
