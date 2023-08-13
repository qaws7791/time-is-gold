import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser, useScheduleStore } from "store";
import useMenuStore from "store/useMenuStore"; // TODO export 수정
import { deleteData, getData, getFilterData, patchData, postData } from "supabase/schedule";

export const useSchedule = () => {
  const queryClient = useQueryClient();
  const queryKey = ["schedule"];

  // 현재 유저 email 가져오기
  const { currentUserEmail: email } = useCurrentUser();

  // 선택된 카테고리 가져오기
  const { menu } = useMenuStore();
  // GET Query
  const response = useQuery({
    queryKey: ["schedule", menu],
    queryFn: () => getData({ menu, email })
  });

  // 현재 클릭한 일정 ID 값 전역상태로 받아오기
  const { targetId } = useScheduleStore();
  // GET Query
  const selectedData = useQuery({
    queryKey: ["schedule", targetId],
    queryFn: () => getFilterData(targetId)
  });

  // POST Query
  const postMutation = useMutation(postData, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey })
  });

  // PATCH Query
  const patchMutation = useMutation(patchData, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey })
  });

  // DELETE Query
  const deleteMutation = useMutation(deleteData, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey })
  });

  return { response, selectedData, postMutation, patchMutation, deleteMutation };
};
