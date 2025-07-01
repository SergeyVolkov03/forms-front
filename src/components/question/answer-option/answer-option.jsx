import { useEffect, useState } from "react";
import { updateAnswerOption } from "../../../api/api";
import TextArea from "antd/es/input/TextArea";
import { CloseOutlined, BorderOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import "./answer-option.css";

export default function AnswerOption({ data, onDelete, isDelete }) {
  const [value, setValue] = useState(data.value);
  console.log(onDelete, isDelete);

  useEffect(() => {
    async function fetchValue() {
      updateAnswerOption(data.id, { value })
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    const timer = setTimeout(() => {
      fetchValue();
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  function onChangeValue(e) {
    setValue(e.target.value);
  }

  return (
    <Flex style={{ margin: "5px 0" }}>
      <BorderOutlined
        style={{ marginRight: 10, color: "rgba(5, 5, 5, 0.3)", marginLeft: 5 }}
      />
      <TextArea
        placeholder="Choice"
        autoSize
        value={value}
        maxLength={100}
        size="middle"
        onChange={onChangeValue}
      />
      {isDelete && <CloseOutlined className="delete-icon" onClick={onDelete} />}
    </Flex>
  );
}
