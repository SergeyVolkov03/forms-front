import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { updateTemplate } from "../../../api/api";

export default function TemplateTitle({ data, disabled }) {
  const [title, setTitle] = useState(data.title);

  useEffect(() => {
    async function fetchTitle() {
      updateTemplate(data.id, { title: title }).catch((e) => {
        console.log(e);
      });
    }
    const timer = setTimeout(() => {
      fetchTitle();
    }, 300);

    return () => clearTimeout(timer);
  }, [title]);

  function onChangeTitle(e) {
    setTitle(e.target.value);
  }

  return (
    <>
      <TextArea
        disabled={disabled}
        placeholder="Title"
        autoSize
        value={title}
        maxLength={100}
        size="large"
        style={{ marginTop: 5 }}
        onChange={onChangeTitle}
      />
    </>
  );
}
