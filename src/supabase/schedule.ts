import supabase from "supabase";
import type { ISchedulesInsert, ISchedulesUpdate } from "./database.types";

// GET schedules 전체 조회
export const getData = async ({ menu, email }: { menu: string; email: string }) => {
  const { data: schedules, error } =
    menu === "all"
      ? await supabase.from("schedules").select("*").eq("email", email)
      : await supabase.from("schedules").select("*").eq("email", email).eq("backgroundColor", menu);
  if (schedules) return schedules;
  console.error("Error", error);
};

// GET schedule id 조건 필터링
export const getFilterData = async (id: string | null) => {
  const { data, error } = await supabase.from("schedules").select("*").eq("id", id);
  if (data) return data[0];
  console.error("Error", error);
};

// POST schedule
export const postData = async (inputValue: ISchedulesInsert) => {
  const { error } = await supabase.from("schedules").insert([inputValue]).select();
  console.error("Error", error);
};

// PATCH schedule
export const patchData = async ({
  updateValue,
  id
}: {
  updateValue: ISchedulesUpdate;
  id: string;
}) => {
  const { error } = await supabase.from("schedules").update(updateValue).eq("id", id).select();
  console.error("Error", error);
};

// DELETE schedule
export const deleteData = async (id: string) => {
  const { error } = await supabase.from("schedules").delete().eq("id", id);
  console.error("Error", error);
};
