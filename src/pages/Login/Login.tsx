import { Tabs } from "antd";
import backgroundImg from "assets/timeisgold.png";
import LoginForm from "components/Login/LoginForm";
import * as St from "components/Login/LoginForm.style";
import SignUpForm from "components/Login/SignUpForm";

const Login = () => {
  const items = [
    { key: "1", label: "로그인", children: <LoginForm /> },
    { key: "2", label: "회원가입", children: <SignUpForm /> }
  ];

  return (
    <St.Grid>
      <div>
        <St.MainImg src={backgroundImg} alt="금괴 이미지" />
      </div>
      <St.LogInTabs>
        <Tabs items={items} />
      </St.LogInTabs>
    </St.Grid>
  );
};

export default Login;
