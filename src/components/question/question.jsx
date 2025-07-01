import { Button, Flex, Select, Switch } from "antd";
import QuestionDescription from "./question-description/question-description";
import QuestionTitle from "./question-title/question-title";
import updateQuestion, {
  createAnswerOption,
  deleteAnswerOtions,
  getQuestion,
} from "../../api/api";
import { useEffect, useState } from "react";
import AnswerOption from "./answer-option/answer-option";
import { PlusOutlined } from "@ant-design/icons";

const DATA = {
  SHORT_TEXT: "Short text",
  LONG_TEXT: "Long text",
  NUMBER: "Number",
  SINGLE_CHOICE: "Single choice",
  MULTIPLE_CHOICE: "Multiple choice",
};

export default function Question({ data }) {
  const [type, setType] = useState(DATA[data.type]);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [isDisplayed, setIsDisplayed] = useState(data.is_displayed);

  useEffect(() => {
    getQuestion(data.id)
      .then((res) => {
        setAnswerOptions(res.data.answer_options);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const options = [
    { value: "SHORT_TEXT", label: DATA.SHORT_TEXT },
    { value: "LONG_TEXT", label: DATA.LONG_TEXT },
    { value: "NUMBER", label: DATA.NUMBER },
    { value: "SINGLE_CHOICE", label: DATA.SINGLE_CHOICE },
    { value: "MULTIPLE_CHOICE", label: DATA.MULTIPLE_CHOICE },
  ];

  function addAnswerOption() {
    createAnswerOption({ value: "New choice", question_id: data.id })
      .then((res) => {
        setAnswerOptions([...answerOptions, res.data]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function onChangeType(el) {
    if (DATA[el] === DATA.MULTIPLE_CHOICE || DATA[el] === DATA.SINGLE_CHOICE) {
      if (!answerOptions.length) {
        addAnswerOption();
      }
    } else {
      if (answerOptions.length) {
        deleteAnswerOtions({ ids: [...answerOptions.map((el) => el.id)] })
          .then(() => {
            setAnswerOptions([]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }

    setType(DATA[el]);
    updateQuestion(data.id, { type: el }).catch((e) => {
      console.log(e);
    });
  }

  function deleteOption(id) {
    deleteAnswerOtions({ ids: [id] }).catch((e) => {
      console.log(e);
    });
    setAnswerOptions((prev) => prev.filter((item) => item.id !== id));
  }

  function onChangeIsDisplayed(e) {
    setIsDisplayed(e);
    updateQuestion(data.id, { is_displayed: e }).catch((e) => {
      console.log(e);
    });
  }

  return (
    <Flex
      vertical
      style={{
        width: "100%",
        borderLeft: "1px solid rgba(5, 5, 5, 0.1)",
        paddingLeft: 5,
        margin: "10px 0",
      }}
    >
      <Flex style={{ gap: 5 }}>
        <QuestionTitle data={data} />
        <Select
          listHeight={100}
          placeholder="Type"
          defaultValue={type}
          options={options}
          style={{ width: 200 }}
          onChange={onChangeType}
        />
      </Flex>
      <QuestionDescription data={data} />
      <div style={{ fontSize: 14, fontWeight: 300, margin: "5px" }}>
        Show in the table
        <Switch
          style={{ marginLeft: 5 }}
          value={isDisplayed}
          onChange={onChangeIsDisplayed}
          size="small"
        />
      </div>
      {!!answerOptions.length &&
        answerOptions.map((item) => (
          <div key={item.id}>
            <AnswerOption
              data={item}
              onDelete={() => {
                deleteOption(item.id);
              }}
              isDelete={answerOptions.length > 1}
            />
          </div>
        ))}
      {answerOptions.length > 0 && (
        <Flex justify="center" style={{ margin: "5px 0" }}>
          <Button
            icon={<PlusOutlined />}
            style={{ marginRight: 30 }}
            onClick={addAnswerOption}
          >
            Add choice
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
