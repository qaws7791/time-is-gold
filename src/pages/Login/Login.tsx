import { useState, useEffect } from "react";
import { Button, Tabs } from "antd";
import supabase from "supabase/index";
import { useNavigate } from "react-router-dom";
import LoginForm from "components/Login/LoginForm";
import SignUpForm from "components/Login/SignUpForm";
import timeisgold2 from "assets/timeisgold2.png";
import * as St from "style/loginStyled";
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then(value => {
        if (value.data?.user) {
          console.log(value.data.user);
          setUser(value.data.user);
          value.data.user !== null ? navigate("/calendar") : navigate("/login");
        }
      });
    }
    getUserData();
  }, []);
  const tabItems = [
    {
      key: "item-1",
      tab: "로그인",
      content: <LoginForm />
    },
    {
      key: "item-2",
      tab: "회원가입",
      content: <SignUpForm />
    }
  ];

  return (
    <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
    <St.Grid>
      <div>
        <St.MainImg src={timeisgold2} alt="시간은 금이다 사진" />
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
    </StyleProvider>
  );
};

export default Login;
