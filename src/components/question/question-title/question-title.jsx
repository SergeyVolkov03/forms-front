import { useEffect, useState } from "react";
import updateQuestion from "../../../api/api";
import TextArea from "antd/es/input/TextArea";

export default function QuestionTitle({ data }) {
  const [title, setTitle] = useState(data.title);

  useEffect(() => {
    async function fetchTitle() {
      updateQuestion(data.id, { title: title }).catch((e) => {
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
        placeholder="Title"
        autoSize
        value={title}
        maxLength={100}
        size="middle"
        onChange={onChangeTitle}
      />
    </>
  );
}
