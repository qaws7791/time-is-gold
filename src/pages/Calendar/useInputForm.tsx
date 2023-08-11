import { useState } from "react";
import type { TColor } from "./Calendar.type";

const useInputForm = <T,>(initialValue: T) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const register = (name: keyof T) => ({
    id: name,
    name,
    value: inputValue[name],
    onChange
  });

  const colorRegister = (color: TColor) => ({
    color,
    onChange,
    value: color,
    type: "radio",
    name: "backgroundColor"
  });

  return { inputValue, setInputValue, register, colorRegister };
};

export default useInputForm;
