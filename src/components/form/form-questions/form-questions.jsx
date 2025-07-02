import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  notification,
  Radio,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { createManyAnswers } from "../../../api/api";
import { useNavigate } from "react-router-dom";

export default function FormQuestions({ data }) {
  const questions = data.template.questions.sort((a, b) => a.order - b.order);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  function openNotificationSucces(text) {
    api.success({
      description: text,
    });
  }

  function onFinish(values) {
    const newData = Object.entries(values).map(([id, value]) => {
      return {
        id: Number(id),
        value: Array.isArray(value)
          ? value.map((el) => {
              const newEl = el.split("-");
              newEl.pop();
              return newEl.join("-");
            })
          : [String(value)],
      };
    });
    const fetchData = newData.map((el) => {
      const question = questions.filter((q) => q.id === el.id);
      if (question[0].type === "SINGLE_CHOICE") {
        const value = el.value[0].split("-");
        value.pop();
        return {
          form_id: data.id,
          question_id: el.id,
          value: [value.join("-")],
        };
      } else {
        return { form_id: data.id, question_id: el.id, value: el.value };
      }
    });

    openNotificationSucces("The form is completed");
    setTimeout(() => {
      navigate("/");
    }, 1000);
    createManyAnswers({ answers: fetchData })
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        {contextHolder}
        {questions.map((el) => {
          if (el.type === "SHORT_TEXT") {
            return (
              <Flex key={el.id} vertical style={{ width: "100%" }}>
                <div>{el.title}</div>
                <div>{el.description}</div>
                <Form.Item
                  name={el.id}
                  rules={[
                    { required: true, message: "Please answer the question" },
                    { max: 100, message: "Your answer too long" },
                  ]}
                >
                  <Input required />
                </Form.Item>
              </Flex>
            );
          }
          if (el.type === "LONG_TEXT") {
            return (
              <Flex key={el.id} vertical>
                <div>{el.title}</div>
                <div>{el.description}</div>
                <Form.Item
                  name={el.id}
                  rules={[
                    { required: true, message: "Please answer the question" },
                  ]}
                >
                  <TextArea required autoSize />
                </Form.Item>
              </Flex>
            );
          }
          if (el.type === "NUMBER") {
            return (
              <Flex key={el.id} vertical>
                <div>{el.title}</div>
                <div>{el.description}</div>
                <Form.Item
                  name={el.id}
                  rules={[
                    {
                      required: true,
                      message: "Please enter a positive number",
                    },
                    {
                      type: "number",
                      min: 0,
                      message: "Number must be positive",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    step={1}
                    precision={0}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Flex>
            );
          }
          if (el.type === "SINGLE_CHOICE") {
            return (
              <Flex key={el.id} vertical>
                <div>{el.title}</div>
                <div>{el.description}</div>
                <Form.Item
                  name={el.id}
                  rules={[
                    {
                      required: true,
                      message: "Please select an option",
                    },
                  ]}
                >
                  <Radio.Group
                    options={el.answer_options.map((item) => ({
                      label: item.value,
                      value: `${item.value}-${item.id}`,
                    }))}
                  />
                </Form.Item>
              </Flex>
            );
          }
          if (el.type === "MULTIPLE_CHOICE") {
            return (
              <Flex key={el.id} vertical>
                <div>{el.title}</div>
                <div>{el.description}</div>
                <Form.Item
                  name={el.id}
                  rules={[
                    {
                      required: true,
                      message: "Please select one or more options",
                    },
                  ]}
                >
                  <Checkbox.Group
                    options={el.answer_options.map((item) => ({
                      label: item.value,
                      value: `${item.value}-${item.id}`,
                    }))}
                  />
                </Form.Item>
              </Flex>
            );
          }
        })}
        <Flex justify="center">
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Flex>
        <Divider />
      </Form>
    </>
  );
}
