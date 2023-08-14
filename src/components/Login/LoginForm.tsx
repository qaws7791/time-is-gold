import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import * as St from "components/Login/LoginForm.style";
import { useDialog } from "hooks/useDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, AuthError } from "supabase/auth";
import { GoogleLoginButton } from "./GoogleLoginButton";

const LoginForm = () => {
  const initialValue = { email: "", password: "" };
  const [inputValue, setInputValue] = useState(initialValue);

  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const { openDialog } = useDialog();
  const onFinish = async () => {
    try {
      await login(inputValue);
      openDialog({ type: "alert", title: "로그인 성공", content: "환영합니다." });
      navigate("/");
    } catch (error) {
      if (error instanceof AuthError) {
        openDialog({ type: "alert", title: "로그인 실패", content: error.message });
      }
    }
    setInputValue(initialValue);
  };

  return (
    <Form
      name="normal_signUp"
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
      <Form.Item name="password" rules={[{ required: true, message: "비밀번호를 입력해주세요!" }]}>
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

      <St.Flex>
        <Form.Item>
          <Button htmlType="submit" type="link">
            로그인
          </Button>
          <GoogleLoginButton />
        </Form.Item>
      </St.Flex>
    </Form>
  );
};

export default LoginForm;
