import supabase from "./index";

interface ILoginValue {
  email: string;
  password: string;
}

interface ISignupValue extends ILoginValue {
  passwordCheck: string;
}

const { auth } = supabase;

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError"; // 에러 이름 설정
  }
}

// 로그인 기능
export const login = async (inputValue: ILoginValue) => {
  const { error } = await auth.signInWithPassword(inputValue);

  if (error?.status) throw new AuthError("로그인 정보가 잘못되었습니다.");
};

const printErrorMessage = (message: string) => {
  switch (message) {
    case "Signup requires a valid password":
      return "비밀번호가 잘못되었습니다."; // (6자 이상) 인풋에서 검사
    case "To signup, please provide your email":
      return "이메일이 잘못되었습니다.";
    default:
      return "회원가입이 실패하였습니다.";
  }
};

// 회원가입 기능
export const signUp = async (inputValue: ISignupValue) => {
  const { email, password } = inputValue;
  const { error } = await auth.signUp({ email, password });

  if (error) {
    throw new AuthError(printErrorMessage(error.message));
  }
};

// 구글 로그인 및 회원가입 기능
export const googleLogin = async () => {
  const { error } = await auth.signInWithOAuth({
    provider: "google",
    options: { queryParams: { access_type: "offline", prompt: "consent" } }
  });

  if (error?.status) throw new AuthError("로그인 정보가 잘못되었습니다.");
};

// 로그아웃 기능
export const logout = async () => {
  const { error } = await auth.signOut();

  if (error?.status) throw new AuthError("로그아웃에 실패하였습니다.");
};
