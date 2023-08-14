import supabase from "./index";

interface ILoginValue {
  email: string;
  password: string;
}

interface ISignupValue extends ILoginValue {
  passwordCheck: string;
}

const { auth } = supabase;

// 로그인 기능
export const login = async (inputValue: ILoginValue) => {
  const { data, error } = await auth.signInWithPassword(inputValue);
  console.log("data :", data);

  if (data.session) alert("로그인 되었습니다");
  if (error && error.status === 400) return alert("로그인 정보가 잘못되었습니다.");
};

// 회원가입 기능
export const signUp = async (inputValue: ISignupValue) => {
  const { email, password } = inputValue;
  const { data, error } = await auth.signUp({ email, password });

  if (data.session) alert("회원가입 되었습니다");
  if (error) {
    switch (error.message) {
      case "Signup requires a valid password":
        return alert("비밀번호가 잘못되었습니다. (6자 이상)");
      case "To signup, please provide your email":
        return alert("이메일이 잘못되었습니다.");
    }
  }
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

  alert("로그아웃 되었습니다");
  if (error) console.log("error :", error);
};
