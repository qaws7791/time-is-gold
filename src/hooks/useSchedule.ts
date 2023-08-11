import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useScheduleStore } from "store";
import supabase from "supabase";
import type { ISchedulesInsert, ISchedulesUpdate } from "supabase/database.types";

// TODO 현재 로그인 유저 이메일 가져오기
// const email = supabase.auth.currentUser.email;

export const useSchedule = () => {
  const queryClient = useQueryClient();
  const queryKey = ["schedule"];

  // GET schedules 전체 조회
  const getData = async () => {
    try {
      const { data: schedules } = await supabase.from("schedules").select("*");
      // .eq("email", email); TODO
      if (schedules) return schedules;
    } catch (error) {
      console.error("new Error", error);
    }
  };

  const response = useQuery({ queryKey, queryFn: getData });

  // GET schedule id 조건 필터링
  // FIXME 배열로 받는거 말고 1개만 받는 API가 있는지?
  const getFilterData = async (id: string | null) => {
    try {
      const { data } = await supabase.from("schedules").select("*").eq("id", id);
      if (data) return data[0];
    } catch (error) {
      console.error("new Error", error);
    }
  };

  // 현재 클릭한 일정 ID 값 전역상태로 받아오기
  const { targetId } = useScheduleStore();
  // GET Query
  if (targetId) {
  }
  const selectedData = useQuery({
    queryKey: ["schedule", targetId],
    queryFn: () => getFilterData(targetId)
  });

  // POST schedule
  const postData = async (inputValue: ISchedulesInsert) => {
    try {
      await supabase.from("schedules").insert([inputValue]).select();
    } catch (error) {
      console.error("new Error", error);
    }
  };

  // POST Query
  const postMutation = useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  // PATCH schedule
  const patchData = async ({ updateValue, id }: { updateValue: ISchedulesUpdate; id: string }) => {
    try {
      await supabase.from("schedules").update(updateValue).eq("id", id).select();
    } catch (error) {
      console.error("new Error", error);
    }
  };

  // PATCH Query
  const patchMutation = useMutation(patchData, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  // DELETE schedule
  const deleteData = async (id: string) => {
    try {
      await supabase.from("schedules").delete().eq("id", id);
    } catch (error) {
      console.error("new Error", error);
    }
  };

  // DELETE Query
  const deleteMutation = useMutation(deleteData, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  return { response, selectedData, postMutation, patchMutation, deleteMutation };
};
