import { IScheduleValue } from "pages/Calendar/FormCalendar";
import supabase from "./index";

// GET schedule
export const getSchedulesData = async () => {
  try {
    const { data } = await supabase.from("schedules").select("title, start, end, backgroundColor");
    // select 할 key
    // {title, start, end? , backgroundColor?(=category)}
    if (data) return data;
  } catch (error) {
    console.error("new Error", error);
    alert("에러입니다.");
  }
};

// POST schedule
export const postData = async (inputValue: IScheduleValue) => {
  try {
    const { data, error } = await supabase.from("schedules").insert([inputValue]).select();
    console.log("error :", error);
    console.log("data :", data);
  } catch (error) {
    console.error("new Error", error);
    alert("에러입니다.");
  }
};

// PATCH schedule
export const patchData = async () => {};

// DELETE schedule
export const deleteData = async () => {};
