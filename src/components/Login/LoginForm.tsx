import { LockOutlined, MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
//import supabase from "supabase";
//import { Auth } from "@supabase/auth-ui-react";
//import { ThemeSupa } from "@supabase/auth-ui-shared";

export interface LoginType {
  email: string;
  password: string;
  loginHandler: (e: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<void>;
  googleLoginHandler: (e: React.FormEvent) => Promise<void>;
  EmailChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  PasswordChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  PasswordCheckChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const LoginForm = ({
  email,
  password,
  loginHandler,
  googleLoginHandler,
  EmailChangeHandler,
  PasswordChangeHandler
}: LoginType) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const resetField = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    form.setFieldsValue({
      email: "",
      password: ""
    });
  };
  return (
    <div>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item name="email" rules={[{ required: true, message: "Please input your E-mail!" }]}>
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="e-mail"
            value={email}
            name="email"
            onChange={EmailChangeHandler}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="password"
            value={password}
            name="password"
            onChange={PasswordChangeHandler}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ backgroundColor: "yellow" }}
            onClick={e => {
              loginHandler(e);
              resetField(e); // 로그인 시에 password 필드 초기화
            }}
          >
            로그인
          </Button>

          <Space direction="vertical">
            <Space wrap>
              <Button
                type="primary"
                icon={<GoogleOutlined />}
                style={{ backgroundColor: "yellow" }}
                onClick={googleLoginHandler}
              >
                구글 로그인
              </Button>
            </Space>
          </Space>
        </Form.Item>
      </Form>
      {/* <Auth
        supabaseClient={supabase}
        appearance={{theme: ThemeSupa}}
        providers={["google"]}
      /> */}
    </div>
  );
};

export default LoginForm;
