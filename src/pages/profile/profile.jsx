import { useParams } from "react-router-dom";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { createTemplate } from "../../api/api";
import MyTemplates from "../../components/my-templates/my-templates";

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

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
