import React, { useState, useEffect } from "react";
import { Button, Tabs } from "antd";
import supabase from "supabase/index";
import { useNavigate } from "react-router-dom";
import LoginForm from "components/Login/LoginForm";
import SignUpForm from "components/Login/SignUpForm";

const Login = () => {
  const navigate = useNavigate();
  supabase.auth.onAuthStateChange(async event => {
    if (event !== "SIGNED_OUT") {
      // navigate("/");
    } else {
      // navigate("/login");
    }
  });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
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

  const EmailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const PasswordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const PasswordCheckChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };

  const signupHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      console.log(data);
      if (error) {
        console.error(error);
        alert("아이디와 비밀번호를 확인해주세요");
      } else {
        alert("회원가입이 되었습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      console.log(data);
      if (error) {
        console.error(error);
        alert("아이디와 비밀번호를 확인해주세요");
      } else {
        alert("로그인 되었습니다.");
      }
      // setEmail("")
      // setPassword("")
      //formRef.current?.resetFields();
    } catch (error) {
      console.error(error);
    }
    // var clear=""
    // setEmail("")
    // setPassword("")
    //formRef.current?.resetFields();
  };
  const googleLoginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent"
          }
        }
      });
      console.log(data);
      if (error) console.error(error);
    } catch (error) {
      console.error(error);
    }
  };

  const logoutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="로그인" key="item-1">
          <LoginForm
            email={email}
            password={password}
            loginHandler={loginHandler}
            googleLoginHandler={googleLoginHandler}
            EmailChangeHandler={EmailChangeHandler}
            PasswordChangeHandler={PasswordChangeHandler}
            PasswordCheckChangeHandler={PasswordCheckChangeHandler}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="회원가입" key="item-2">
          <SignUpForm
            email={email}
            password={password}
            passwordCheck={passwordCheck}
            signupHandler={signupHandler}
            googleLoginHandler={googleLoginHandler}
            EmailChangeHandler={EmailChangeHandler}
            PasswordChangeHandler={PasswordChangeHandler}
            PasswordCheckChangeHandler={PasswordCheckChangeHandler}
          />
        </Tabs.TabPane>
      </Tabs>
      <Button onClick={() => logoutHandler()}>로그아웃</Button>
    </div>
  );
};

export default Login;
