import supabase from "supabase";

// . todo를 수정할 때는 '1.tag 전체 모음'도 supabase에서 가져오고 '2.post에 해당하는 todo에 이미 저장된  tag도 따로 호출해서 담아 내려줘야함'

// 로그인한 사용자에 대한  tags 모음 부르기
export const getTags = async (userId: string) => {
  const { data } = await supabase.from("tags").select().eq("userId", "jieun2563@naver.com");
  const tags = data?.[0].tag;
  return tags;
};
