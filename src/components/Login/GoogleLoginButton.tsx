import { Button } from "antd";
import google from "assets/google.png";
import { styled } from "styled-components";
import { googleLogin } from "supabase/auth";

export const GoogleLoginButton = () => {
  return (
    <Button type="link" onClick={googleLogin} style={{ position: "relative" }}>
      <GoogleImg src={google} alt="구글로고" />
      <Text>구글 로그인</Text>
    </Button>
  );
};

const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  transform: translateX(14px);
`;

const GoogleImg = styled.img`
  position: absolute;
  left: -2px;
  top: -2px;

  width: 32px;
`;
