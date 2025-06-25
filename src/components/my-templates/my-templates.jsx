import { useEffect, useState } from "react";
import { getTemplatesByUserId } from "../../api/api";
import { Link } from "react-router-dom";

export default function MyTemplates({ user_id }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTemplatesByUserId(user_id).then((res) => {
      setData(res.data);
    });
  }, []);

  return data.map((element) => {
    return (
      <Link key={element.id} to={`/template/${element.id}`}>
        {element.title}
      </Link>
    );
  });
}
