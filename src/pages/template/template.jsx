import { useParams } from "react-router-dom";

export default function TemplatePage() {
  const { id } = useParams();

  return <div>template {id}</div>;
}
