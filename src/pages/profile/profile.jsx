import { useParams } from "react-router-dom";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { createTemplate, getUser } from "../../api/api";
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

  function onClick() {
    createTemplate({
      author_id: +id,
      title: "New Template",
      topic_id: 1,
    }).then((res) => {
      navigate(`/template/${res.data.id}`);
    });
  }

  return (
    <div>
      profile {id}
      <Button type="primary" onClick={onClick}>
        Create template
      </Button>
      <div>My templates</div>
      <MyTemplates user_id={id} />
    </div>
  );
}
