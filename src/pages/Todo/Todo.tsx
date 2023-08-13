// TODO 할일 추가 전역으로 관리하는 모달로 띄울 예정 (일단 임시 생성)
import { useInfiniteQuery } from "@tanstack/react-query";
import TodoModal from "components/TodoCollection/TodoModal";
import useOverlay from "hooks/useOverlay";
import useMenuStore from "store/useMenuStore";
import { styled } from "styled-components";
import { getTodos } from "supabase/todo";
import TodoItem from "../../components/TodoCollection/TodoItem";

const Todo: React.FC = () => {
  const overlay = useOverlay();
  const { menu } = useMenuStore();
  // const { data: allTodos, isLoading, isError } = useQuery(["todos"], getTodos);
  const { data, isLoading, isError } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: getTodos,
    getNextPageParam: lastPage => {
      console.log("lastPage", lastPage);
    }
  });
  console.log("data :", data);

  const openPromiseToModal = () =>
    new Promise(resolve => {
      overlay.open(({ close }) => (
        <TodoModal
          onConfirm={() => {
            resolve(true);
            close();
          }}
          onClose={() => {
            resolve(false);
            close();
          }}
        />
      ));
    });

  const onClickStartForm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    await openPromiseToModal();
  };

  if (!data) return <p>로딩중</p>;
  const allTodos = data.pages[0];

  let Todos = allTodos;
  let todoListTitle = "";
  // let

  switch (menu) {
    case "1":
      todoListTitle = "미완료";
      Todos = allTodos!.filter(item => item.isDone === false);
      break;
    case "10":
      todoListTitle = "완료";
      Todos = allTodos!.filter(item => item.isDone === true);
      break;
    case "20":
      todoListTitle = "중요";
      Todos = allTodos!.filter(item => item.important === true && item.isDone === false);
  }
  if (isLoading) return <div>내 투두 주이소</div>;
  if (isError) return <div>에러남</div>;
  if (Todos) console.log(Todos);
  return (
    <div>
      {/* {isStartForm && <TodoModal />} */}
      <div>
        <p>{todoListTitle}</p>
        <button onClick={onClickStartForm}>+</button>
      </div>
      <StWrapperTodos>
        {Todos?.sort((a, b) => a.id - b.id).map(item => {
          return <TodoItem key={item.id} item={item} />;
        })}
      </StWrapperTodos>
    </div>
  );
};
export default Todo;

/*
데이터를 쿼리하려면 정책이 필요합니다.
이 테이블에서 데이터를 쿼리하려면 먼저 액세스 정책을 작성해야 합니다. 정책이 없으면 이 테이블을 쿼리하면 빈 결과 배열이 생성됩니다.

이 테이블을 생성한 후 정책을 생성할 수 있습니다.
*/

const StWrapperTodos = styled.div`
  padding: 10px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: dense;
`;
