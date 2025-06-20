import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <header>layout</header>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
}
