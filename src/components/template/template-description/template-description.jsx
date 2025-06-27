import TextArea from "antd/es/input/TextArea";
import { updateTemplate } from "../../../api/api";
import { useEffect, useState } from "react";

export default function TemplateDescription({ data }) {
  const [description, setDescription] = useState(data.description);

  useEffect(() => {
    async function fethDescription() {
      updateTemplate(data.id, { description: description }).catch((e) => {
        console.log(e);
      });
    }

    const timer = setTimeout(() => {
      fethDescription();
    }, 300);

    return () => clearTimeout(timer);
  }, [description]);

  function onChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <TextArea
      placeholder="Description"
      autoSize
      value={description}
      maxLength={200}
      size="middle"
      style={{ marginTop: 5, marginBottom: 5 }}
      onChange={onChangeDescription}
    />
  );
}
