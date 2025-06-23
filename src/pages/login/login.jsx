import { Link } from "react-router-dom";
import "./login.css";
import LoginForm from "../../components/login-form/login-form";

export default function LoginPage() {
  return (
    <div>
      <div className="login">
        <LoginForm />
      </div>
      <div className="login-footer">
        <div>
          Don`t have an accaunt?
          <Link to={"/registration"} className="link">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
