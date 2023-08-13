import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import * as St from "components/Login/LoginForm.style";
import { useState } from "react";
import { signUp } from "supabase/auth";
import { GoogleLoginButton } from "./GoogleLoginButton";

const SignUpForm = () => {
  const initialValue = { email: "", password: "", passwordCheck: "" };
  const [inputValue, setInputValue] = useState(initialValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const onFinish = () => {
    signUp(inputValue);
    setInputValue(initialValue);
  };

  return (
    <div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item name="email" rules={[{ required: true, message: "이메일을 입력해주세요!" }]}>
          <Input
            status="warning"
            prefix={<MailOutlined className="site-form-item-icon" style={{ color: "#F3AF00" }} />}
            type="email"
            placeholder="E-mail"
            name="email"
            value={inputValue.email}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력해주세요!" }]}
        >
          <Input
            status="warning"
            prefix={<LockOutlined className="site-form-item-icon" style={{ color: "#F3AF00" }} />}
            type="password"
            placeholder="password"
            name="password"
            value={inputValue.password}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item
          name="passwordCheck"
          rules={[{ required: true, message: "비밀번호를 다시 입력해주세요!" }]}
        >
          <Input
            status="warning"
            prefix={<LockOutlined className="site-form-item-icon" style={{ color: "#F3AF00" }} />}
            type="password"
            placeholder="Password"
            value={inputValue.passwordCheck}
            name="passwordCheck"
            onChange={onChange}
          />
        </Form.Item>
        <St.Flex>
          <Form.Item>
            <Button htmlType="submit">회원가입</Button>
            <GoogleLoginButton />
          </Form.Item>
        </St.Flex>
      </Form>
    </div>
  );
};

export default SignUpForm;
