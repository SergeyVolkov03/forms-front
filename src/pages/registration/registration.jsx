import { Link } from "react-router-dom";
import RegistrationForm from "../../components/registration-form/registration-form";
import "./registration.css";

export default function RegistrationPage() {
  return (
    <>
      <div className="registration">
        <RegistrationForm />
      </div>
      <div className="registration-footer">
        Have an accaunt?
        <Link to={"/login"} className="link">
          Sign In
        </Link>
      </div>
    </>
  );
}
