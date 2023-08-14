import { Button } from "antd";
import google from "assets/google.png";
import { useDialog } from "hooks/useDialog";
import { styled } from "styled-components";
import { AuthError, googleLogin } from "supabase/auth";

export const GoogleLoginButton = () => {
  const { openDialog } = useDialog();

  const googleLoginHandler = () => {
    try {
      googleLogin();
    } catch (error) {
      if (error instanceof AuthError) {
        openDialog({ type: "alert", title: "로그인 실패", content: error.message });
      }
    }
  };

  return (
    <Button type="link" onClick={googleLoginHandler} style={{ position: "relative" }}>
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
