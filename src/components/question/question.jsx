import { Flex } from "antd";
import QuestionDescription from "./question-description/question-description";
import QuestionTitle from "./question-title/question-title";
import QuestionType from "./questtion-type/question-type";

export default function Question({ data }) {
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
        <QuestionType data={data} />
      </Flex>

      <QuestionDescription data={data} />
    </Flex>
  );
}
