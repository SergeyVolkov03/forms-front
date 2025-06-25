import { useParams } from "react-router-dom";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../api/api";
import MyTemplates from "../../components/my-templates/my-templates";
import { useEffect } from "react";
import { useAuth } from "../../provider/authProvider";

export default function ProfilePage() {
  const { token, setAuthToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  function checkUser(user) {
    if (user.is_admin || user.id === +id) return;
    navigate("/");
  }

  useEffect(() => {
    if (token) {
      getUser(token)
        .then((res) => {
          checkUser(res.data);
        })
        .catch(() => {
          setAuthToken();
        });
    }
  }, []);

  return <MyTemplates user_id={id} />;
}
