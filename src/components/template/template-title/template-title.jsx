import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { updateTemplate } from "../../../api/api";

export default function TemplateTitle({ data }) {
  const [title, setTitle] = useState(data.title);

  useEffect(() => {
    async function fethTitle() {
      updateTemplate(data.id, { title: title }).catch((e) => {
        console.log(e);
      });
    }
    const timer = setTimeout(() => {
      fethTitle();
    }, 300);

    return () => clearTimeout(timer);
  }, [title]);

  function onChangeTitle(e) {
    setTitle(e.target.value);
  }

  return (
    <>
      <TextArea
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
