import { ISchedule, ISchedulePost } from "pages/Calendar/Calendar.type";
import supabase from "./index";

// TODO 현재 로그인 유저 이메일 가져오기
// const email = supabase.auth.currentUser.email;

// GET schedules 전체 조회
export const getSchedulesData = async () => {
  try {
    const { data } = await supabase
      .from("schedules")
      .select("title, start, end, backgroundColor, id");
    // .eq("email", email); TODO
    if (data) return data;
  } catch (error) {
    console.error("new Error", error);
    alert("에러입니다.");
  }
};

// GET schedule id 조건 필터링
export const getFilteredSchedulesData = async (id: string | null) => {
  try {
    const { data } = await supabase
      .from("schedules")
      .select("id,title,start,end,backgroundColor")
      .eq("id", id);

    if (data) return data[0];
  } catch (error) {
    console.error("new Error", error);
    alert("에러입니다.");
  }
};

// POST schedule
export const postData = async (inputValue: ISchedulePost) => {
  try {
    await supabase.from("schedules").insert([inputValue]).select();
  } catch (error) {
    console.error("new Error", error);
    alert("에러입니다.");
  }
};

// PATCH schedule
export const patchData = async (id: string, updatedData: ISchedule) => {
  try {
    await supabase.from("schedules").update(updatedData).eq("id", id).select();
  } catch (error) {
    console.error("new Error", error);
  }
};

// DELETE schedule
export const deleteData = async (id: string) => {
  try {
    await supabase.from("schedules").delete().eq("id", id);
  } catch (error) {
    console.error("new Error", error);
    alert("에러입니다.");
  }
};
