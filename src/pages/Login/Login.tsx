import { Tabs } from "antd";
import backgroundImg from "assets/timeisgold.png";
import LoginForm from "components/Login/LoginForm";
import * as St from "components/Login/LoginForm.style";
import SignUpForm from "components/Login/SignUpForm";

const Login = () => {
  const tabItems = [
    { key: "item-1", tab: "로그인", content: <LoginForm /> },
    { key: "item-2", tab: "회원가입", content: <SignUpForm /> }
  ];

  return (
    <St.Grid>
      <div>
        <St.MainImg src={backgroundImg} alt="금괴 이미지" />
      </div>
      <St.LogInTabs>
        <Tabs>
          {tabItems.map(item => (
            <Tabs.TabPane key={item.key} tab={item.tab}>
              {item.content}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </St.LogInTabs>
    </St.Grid>
  );
};

export default Login;
