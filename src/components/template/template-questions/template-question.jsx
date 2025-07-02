import { Button, Flex } from "antd";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import {
  createQuestion,
  deleteQuestion,
  updateQuestionsByOrder,
} from "../../../api/api";
import { MenuOutlined } from "@ant-design/icons";
import Question from "../../question/question";

export default function TemplateQuestions({
  data,
  position,
  setPosition,
  disabled,
}) {
  const [questions, setQuestions] = useState(
    data.questions.sort((a, b) => a.order - b.order)
  );

  useEffect(() => {
    const data = questions.map((el) => ({ id: el.id, order: el.order }));
    updateQuestionsByOrder({
      questions: data,
    }).catch((e) => {
      console.log(e);
    });
  }, [questions]);

  function handleUpdate(newQuestions) {
    const updatedQuestions = newQuestions.map((question, index) => ({
      ...question,
      order: index + 1,
    }));
    setQuestions(updatedQuestions);
  }

  function handleSortEnd(e) {
    const newQuestions = [...questions];
    const movedQuestion = newQuestions.splice(e.oldIndex, 1)[0];
    newQuestions.splice(e.newIndex, 0, movedQuestion);
    const updatedQuestions = newQuestions.map((question, index) => ({
      ...question,
      order: index + 1,
    }));
    setQuestions(updatedQuestions);
    setPosition(0);
  }

  function createQuestionFetch() {
    createQuestion({
      template_id: data.id,
      order: position,
      title: "New question",
      type: "SHORT_TEXT",
    })
      .then((res) => {
        const newQuestions = [
          ...questions.slice(0, position - 1),
          res.data,
          ...questions.slice(position - 1).map((element) => ({
            ...element,
            order: element.order + 1,
          })),
        ];
        setQuestions(newQuestions);
        setPosition(0);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handlePosition(e) {
    const question = questions.find(
      (question) => question.id === +e.currentTarget.id
    );
    setPosition(question.order + 1);
  }

  function removeQuestion() {
    const newQuestions = [...questions];
    const question = newQuestions.splice(position - 2, 1)[0];
    const result = [
      ...newQuestions.slice(0, position - 2),
      ...newQuestions.slice(position - 2).map((el) => ({
        ...el,
        order: el.order - 1,
      })),
    ];
    deleteQuestion(question.id)
      .then(() => {
        setQuestions(result);
        setPosition(0);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      {position === 1 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={createQuestionFetch}
            style={{ marginBottom: 5 }}
            disabled={disabled}
          >
            Add question
          </Button>
        </div>
      )}
      <div className="questions">
        <ReactSortable
          disabled={disabled}
          list={questions}
          setList={handleUpdate}
          onEnd={handleSortEnd}
          animation={150}
          ghostClass="sortable-ghost"
          handle=".drag-handle"
        >
          {questions.map((item) => (
            <div key={item.id} style={{ margin: "5px 0" }}>
              <div
                id={item.id}
                onClick={handlePosition}
                className="sortable-item"
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <div style={{ paddingTop: 15 }}>
                  <span
                    className="drag-handle"
                    style={{
                      cursor: "move",
                      marginRight: "5px",
                    }}
                  >
                    <MenuOutlined style={{ color: "rgba(5, 5, 5, 0.3)" }} />
                  </span>
                </div>

                <Question data={item} disabled={disabled} />
              </div>
              <Flex justify="center" style={{ margin: "10px 0", gap: 5 }}>
                {position === item.order + 1 && (
                  <>
                    <Button disabled={disabled} onClick={createQuestionFetch}>
                      Add question
                    </Button>
                    <Button
                      disabled={disabled}
                      danger
                      ghost
                      onClick={removeQuestion}
                    >
                      Delete question
                    </Button>
                  </>
                )}
              </Flex>
            </div>
          ))}
        </ReactSortable>
      </div>
    </>
  );
}
