import supabase from "./index";

interface ILoginValue {
  email: string;
  password: string;
}

interface ISignupValue {
  email: string;
  password: string;
  passwordCheck: string;
}

const { auth } = supabase;

// 로그인 기능
export const login = async (inputValue: ILoginValue) => {
  const { error } = await auth.signInWithPassword(inputValue);
  // alert("로그인 되었습니다.");
  if (error) console.log("error :", error);
};

// 회원가입 기능
export const signUp = async (inputValue: ISignupValue) => {
  const { email, password } = inputValue;
  const { error } = await auth.signUp({ email, password });
  // alert("회원가입이 되었습니다.");
  if (error) console.log("error :", error);
};

// 구글 로그인 및 회원가입 기능
export const googleLogin = async () => {
  const { error } = await auth.signInWithOAuth({
    provider: "google",
    options: { queryParams: { access_type: "offline", prompt: "consent" } }
  });
  if (error) console.log("error :", error);
};

// 로그아웃 기능
export const logout = async () => {
  const { error } = await auth.signOut();
  // TODO alert 수정
  alert("로그아웃 되었습니다");
  if (error) console.log("error :", error);
};
