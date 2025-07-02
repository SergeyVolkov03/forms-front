import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../api/api";
import { useEffect } from "react";
import { useAuth } from "../../provider/authProvider";
import { Tabs } from "antd";
import TemplateTable from "../../components/template-table/template-table";

export default function ProfilePage() {
  const { token, setAuthToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  function checkUser(user) {
    if (user.is_admin || user.id === +id) return;
    navigate("/");
  }

  const items = [
    {
      key: "1",
      label: "My templates",
      children: <TemplateTable user_id={id} />,
    },
    {
      key: "2",
      label: "My forms",
      children: "Content of Tab Pane 2",
    },
  ];

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

  return <Tabs defaultActiveKey="1" items={items} centered />;
}
