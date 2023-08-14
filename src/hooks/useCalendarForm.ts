import { useState } from "react";
import type { TBackgroundColor } from "supabase/database.types";

export const useCalendarForm = <T>(initialValue: T) => {
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

  const colorRegister = (color: TBackgroundColor) => ({
    color,
    onChange,
    value: color,
    type: "radio",
    name: "backgroundColor"
  });

  return { inputValue, setInputValue, register, colorRegister };
};
