import supabase from "supabase";
import type { ISchedulesInsert, ISchedulesUpdate } from "./database.types";

// GET schedules 전체 조회
export const getData = async ({ menu, email }: { menu: string; email: string }) => {
  try {
    const { data: schedules } =
      menu === "1"
        ? await supabase.from("schedules").select("*").eq("email", email)
        : await supabase
            .from("schedules")
            .select("*")
            .eq("email", email)
            .eq("backgroundColor", menu);
    if (schedules) return schedules;
  } catch (error) {
    console.error("new Error", error);
  }
};

// GET schedule id 조건 필터링
export const getFilterData = async (id: string | null) => {
  try {
    const { data } = await supabase.from("schedules").select("*").eq("id", id);
    if (data) return data[0];
  } catch (error) {
    console.error("new Error", error);
  }
};

// POST schedule
export const postData = async (inputValue: ISchedulesInsert) => {
  try {
    await supabase.from("schedules").insert([inputValue]).select();
  } catch (error) {
    console.error("new Error", error);
  }
};

// PATCH schedule
export const patchData = async ({
  updateValue,
  id
}: {
  updateValue: ISchedulesUpdate;
  id: string;
}) => {
  try {
    await supabase.from("schedules").update(updateValue).eq("id", id).select();
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
  }
};
