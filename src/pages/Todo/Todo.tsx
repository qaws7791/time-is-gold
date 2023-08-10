// TODO 할일 추가 전역으로 관리하는 모달로 띄울 예정 (일단 임시 생성)

import { useQuery } from "@tanstack/react-query";
import { getTodos } from "api/todo";
import TodoItem from "../../components/TodoCollection/TodoItem";
import { styled } from "styled-components";
import TodoModal from "components/TodoCollection/TodoModal";
import useOverlay from "hooks/useOverlay";

const Todo: React.FC = () => {
  const { data: Todos, isLoading, isError } = useQuery(["todos"], getTodos);
  const overlay = useOverlay();

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

  if (isLoading) return <div>내 투두 주이소</div>;
  if (isError) return <div>에러남</div>;
  if (Todos) console.log(Todos);
  return (
    <div>
      {/* {isStartForm && <TodoModal />} */}
      <div>
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
