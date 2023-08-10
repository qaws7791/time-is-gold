import React, { useState, useEffect } from "react";
import { Button, Tabs } from "antd";
import supabase from "supabase/index";
import LoginStore from "store/LoginStore";
import { useNavigate } from "react-router-dom";
import LoginForm from "components/Login/LoginForm";
import SignUpForm from "components/Login/SignUpForm";

const Login = () => {
  const {logoutHandler}=LoginStore()
  const navigate = useNavigate();
  supabase.auth.onAuthStateChange(async event => {
    if (event !== "SIGNED_OUT") {
      // navigate("/");
    } else {
      // navigate("/login");
    }
  });
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then(value => {
        if (value.data?.user) {
          console.log(value.data.user);
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);

  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="로그인" key="item-1">
          <LoginForm/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="회원가입" key="item-2">
          <SignUpForm/>
        </Tabs.TabPane>
      </Tabs>
      <Button onClick={() => logoutHandler()}>로그아웃</Button>
    </div>
  );
};

export default Login;
