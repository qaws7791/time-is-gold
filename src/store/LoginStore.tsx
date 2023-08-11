import { create } from "zustand";
import supabase from "supabase/index";


interface LoginState {
  email: string;
  password: string;
  passwordCheck: string;
  EmailChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  PasswordChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  PasswordCheckChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loginHandler: (e: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<void>;
  signupHandler: (e: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<void>;
  googleLoginHandler: (e: React.FormEvent) => Promise<void>;
  logoutHandler: () => Promise<void>;
  clear: () => void;
}
const LoginStore = create<LoginState>(set => ({
  // onchange 함수 기능
  email: "",
  EmailChangeHandler: e => set({ email: e.target.value }),

  password: "",
  PasswordChangeHandler: e => set({ password: e.target.value }),

  passwordCheck: "",
  PasswordCheckChangeHandler: e => set({ passwordCheck: e.target.value }),
  // 인풋창 초기화
  clear: () => {
    set({ email: "", password: "" });
  },
  // 로그인 기능
  loginHandler: async e => {
    e.preventDefault();
    try {
      const state = LoginStore.getState();
      const { email, password } = state;
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
    } catch (error) {
      console.error(error);
    }
  },
  // 회원가입 기능
  signupHandler: async e => {
    e.preventDefault();
    try {
      const state = LoginStore.getState();
      const { email, password } = state;
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
  },
  //구글 로그인 및 회원가입 기능
  googleLoginHandler: async e => {
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
  },
  // 로그아웃 기능(+로그인페이지로 이동하게 수정+clear 기능)
  logoutHandler: async () => {
    const { error } = await supabase.auth.signOut();
    if (error == null) {
      alert("로그아웃 되었습니다");
      console.log("sign out");
    } else {
      console.log(error);
    }
  }
}));
export default LoginStore;
