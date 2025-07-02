import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import updateQuestion from "../../../api/api";

export default function QuestionDescription({ data, disabled }) {
  const [description, setDescription] = useState(data.description);

  useEffect(() => {
    async function fethDescription() {
      updateQuestion(data.id, { description: description }).catch((e) => {
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
      disabled={disabled}
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
