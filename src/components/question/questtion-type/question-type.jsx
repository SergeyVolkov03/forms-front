import { Select } from "antd";
import updateQuestion from "../../../api/api";

const DATA = {
  SHORT_TEXT: "Short text",
  LONG_TEXT: "Long text",
  NUMBER: "Number",
  SINGLE_CHOICE: "Single choice",
  MULTIPLE_CHOICE: "Multiple choice",
};

export default function QuestionType({ data }) {
  const options = [
    { value: "SHORT_TEXT", label: DATA.SHORT_TEXT },
    { value: "LONG_TEXT", label: DATA.LONG_TEXT },
    { value: "NUMBER", label: DATA.NUMBER },
    { value: "SINGLE_CHOICE", label: DATA.SINGLE_CHOICE },
    { value: "MULTIPLE_CHOICE", label: DATA.MULTIPLE_CHOICE },
  ];

  function onChnageType(type) {
    updateQuestion(data.id, { type }).catch((e) => {
      console.log(e);
    });
  }

  return (
    <>
      <Select
        listHeight={100}
        placeholder="Type"
        defaultValue={DATA[data.type]}
        options={options}
        style={{ width: 200 }}
        onChange={onChnageType}
      />
    </>
  );
}
