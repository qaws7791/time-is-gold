import { LockOutlined, MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import LoginStore from "store/LoginStore";
import * as St from "style/loginStyled";
const SignUpForm = () => {
  const {
    email,
    password,
    passwordCheck,
    EmailChangeHandler,
    PasswordChangeHandler,
    PasswordCheckChangeHandler,
    signupHandler,
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
            placeholder="E-mail"
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
        <Form.Item
          name="passwordCheck"
          rules={[{ required: true, message: "Please input your Password agian!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            value={passwordCheck}
            name="passwordCheck"
            onChange={PasswordCheckChangeHandler}
          />
        </Form.Item>
        <St.Flex>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="signUp-form-button"
              style={{ backgroundColor: "yellow" }}
              onClick={e => {
                signupHandler(e);
                resetField(e);
              }}
            >
              회원가입
            </Button>
            <Space direction="vertical">
              <Space wrap>
                <Button
                  type="primary"
                  icon={<GoogleOutlined />}
                  style={{ backgroundColor: "yellow" }}
                  onClick={googleLoginHandler}
                >
                  구글과 회원가입
                </Button>
              </Space>
            </Space>
          </Form.Item>
        </St.Flex>
      </Form>
    </div>
  );
};

export default SignUpForm;