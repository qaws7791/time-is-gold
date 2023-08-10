import create from "zustand";
import { devtools } from "zustand/middleware";

export interface LoginState{
    email:string;
}
const LoginStore = create(
     devtools((set) => ({
        email:"",






        
            }))
);
export default LoginStore;