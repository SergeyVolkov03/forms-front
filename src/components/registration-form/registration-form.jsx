import { Button, Checkbox, Form, Input } from "antd";
import "./registration-form.css";
import { useAuth } from "../../provider/authProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchRegistrationData } from "../../api/api";

export default function RegistrationForm() {
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();
  const [err, setErr] = useState();

  async function onFinish(data) {
    fetchRegistrationData(data)
      .then((res) => {
        setAuthToken(res.data.accessToken);
        navigate("/", { replace: true });
      })
      .catch((e) => {
        if (e.message === "Network Error") {
          setErr(e.message);
        } else {
          setErr(e.response.data.message);
        }
      });
  }

  return (
    <div className="registration-container">
      <p className="registration-header">Sign up to The App</p>
      <p className="registration-error">{err}</p>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please input a valid E-mail!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
