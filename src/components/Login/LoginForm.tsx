import { LockOutlined, MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import LoginStore from "store/LoginStore";
import * as St from "style/loginStyled";

const LoginForm = () => {
  const {
    email,
    password,
    EmailChangeHandler,
    PasswordChangeHandler,
    loginHandler,
    googleLoginHandler,
    clear
  } = LoginStore();
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const resetField = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    form.setFieldsValue({
      email: "",
      password: "",
      passwordCheck: ""
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

        <St.Flex>
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
        </St.Flex>
      </Form>
    </div>
  );
};

export default LoginForm;
