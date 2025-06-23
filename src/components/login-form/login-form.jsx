import { Button, Checkbox, Form, Input } from "antd";
import "./login-form.css";
import { useAuth } from "../../provider/authProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchLoginData } from "../../api/api";

export default function LoginForm() {
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();
  const [err, setErr] = useState();

  async function onFinish(data) {
    fetchLoginData(data)
      .then((res) => {
        setAuthToken(res.data.accessToken);
        navigate("/", { replace: true });
      })
      .catch((e) => {
        setErr(e.response.data.message);
        console.log(e.response.data.message);
      });
  }

  return (
    <div className="login-container">
      <p className="login-header">Sign in to The App</p>
      <p className="login-error">{err}</p>
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
          label="password"
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
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
