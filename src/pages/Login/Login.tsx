import { useState, useEffect } from "react";
import { Button, Tabs } from "antd";
import supabase from "supabase/index";
import LoginStore from "store/LoginStore";
import { useNavigate } from "react-router-dom";
import LoginForm from "components/Login/LoginForm";
import SignUpForm from "components/Login/SignUpForm";
import timeisgold from "assets/timeisgold.png";
import timeisgold2 from "assets/timeisgold2.png";
import * as St from "style/loginStyled";

const Login = () => {
  //const { logoutHandler } = LoginStore();
  const navigate = useNavigate();
  // supabase.auth.onAuthStateChange(async event => {
  //   if (event !== "SIGNED_OUT") {
  //     navigate("/calendar");
  //   } else {
  //     navigate("/login");
  //   }
  // });

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
     {/*   <Button onClick={() => logoutHandler()}>로그아웃</Button>*/}
      </St.LogInTabs>
    </St.Grid>
           
  );
};

export default Login;
