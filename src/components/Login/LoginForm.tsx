import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useNavigate } from "react-router";
import google from "assets/google.png";
import LoginStore from "store/LoginStore";
import * as St from "style/loginStyled";

const LoginForm = () => {
  const {
    email,
    password,
    EmailChangeHandler,
    PasswordChangeHandler,
    loginHandler,
    googleLoginHandler
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
        <Form.Item name="email" rules={[{ required: true, message: "이메일을 입력해주세요!" }]}>
          <Input
            status="warning"
            prefix={<MailOutlined className="site-form-item-icon" style={{ color: "#F3AF00" }} />}
            type="text"
            placeholder="e-mail"
            value={email}
            name="email"
            onChange={EmailChangeHandler}
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
            value={password}
            name="password"
            onChange={PasswordChangeHandler}
          />
        </Form.Item>

        <St.Flex>
          <Form.Item>
            <Button
              htmlType="submit"
              type="link"
              className="login-form-button"
              onClick={e => {
                loginHandler(e);
                resetField(e);
              }}
            >
              로그인
            </Button>

            <Space direction="vertical">
              <Space wrap>
                <Button type="link" onClick={googleLoginHandler}>
                  <St.GoogleLoginImgFlex>
                    <St.GoogleImg src={google} alt="구글로고" /> 구글 로그인
                  </St.GoogleLoginImgFlex>
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
