import { useEffect, useState } from "react";
import { updateAnswerOption } from "../../../api/api";
import TextArea from "antd/es/input/TextArea";
import { CloseOutlined, BorderOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import "./answer-option.css";

export default function AnswerOption({ data, onDelete, isDelete, disabled }) {
  const [value, setValue] = useState(data.value);

  useEffect(() => {
    async function fetchValue() {
      updateAnswerOption(data.id, { value }).catch((e) => {
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
        disabled={disabled}
        placeholder="Choice"
        autoSize
        value={value}
        maxLength={100}
        size="middle"
        onChange={onChangeValue}
      />
      {isDelete && (
        <CloseOutlined
          className={disabled ? "delete-icon-disabled" : "delete-icon"}
          onClick={disabled ? undefined : onDelete}
          disabled={disabled}
        />
      )}
    </Flex>
  );
}
