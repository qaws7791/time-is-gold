// TODO 할일 추가 전역으로 관리하는 모달로 띄울 예정 (일단 임시 생성)
import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "api/todo";
import TodoItem from "../../components/TodoCollection/TodoItem";
import { styled } from "styled-components";
import TodoModal from "components/TodoCollection/TodoModal";
import useOverlay from "hooks/useOverlay";
import useMenuStore from "store/useMenuStore";
// import { ITodo } from "upabase/database.types";
import { getTags } from "api/tags";
import { FaPlus } from "react-icons/fa6";

const Todo: React.FC = () => {
  const overlay = useOverlay();
  const { menu, tag } = useMenuStore();
  const {
    data: allTodos,
    isLoading: allTodosIsLoading,
    isError: allTodosIsError
  } = useQuery(["todos"], getTodos);

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

  const onClickStartForm = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    await openPromiseToModal();
  };

  // 완료/미완료/중요에 따른 todo
  let Todos = allTodos;
  let todolistTitle = "";

  if (menu === "1") {
    todolistTitle = "미완료";
    Todos = allTodos?.filter(item => {
      return item.isDone === false;
    });
  } else if (menu === "10") {
    todolistTitle = "완료";
    Todos = allTodos?.filter(item => {
      return item.isDone === true;
    });
  } else if (menu === "20") {
    todolistTitle = "중요";
    Todos = allTodos?.filter(item => {
      return item.important === true && item.isDone === false;
    });
  }

  // 태그에 따른 todo 보여주기
  if (tag !== "전체태그") {
    Todos = Todos?.filter(item => {
      console.log(item.tag);
      return item.tag.includes(tag);
    });
  }

  if (allTodosIsLoading) return <div>내 투두 주이소</div>;
  if (allTodosIsError) return <div>에러남</div>;
  if (Todos) console.log(Todos);
  return (
    <StWrapper>
      {/* {isStartForm && <TodoModal />} */}
      <StTodosHeader>
        <p>{todolistTitle}</p>
        <FaPlus className="todoPlus_button" onClick={onClickStartForm} />
      </StTodosHeader>
      <StWrapperTodos>
        {Todos?.sort((a, b) => a.id - b.id).map(item => {
          return <TodoItem key={item.id} item={item} />;
        })}
      </StWrapperTodos>
    </StWrapper>
  );
};
export default Todo;

/*
데이터를 쿼리하려면 정책이 필요합니다.
이 테이블에서 데이터를 쿼리하려면 먼저 액세스 정책을 작성해야 합니다. 정책이 없으면 이 테이블을 쿼리하면 빈 결과 배열이 생성됩니다.

이 테이블을 생성한 후 정책을 생성할 수 있습니다.
*/

const StWrapper = styled.div`
  margin: 20px;
`;

const StWrapperTodos = styled.div`
  padding: 10px;
  width: 100%;
  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  place-items: center;
  grid-gap: 20px;
`;

const StTodosHeader = styled.div`
  height: 35px;
  margin-bottom: 20px;
  display: flex;

  align-items: center;
  gap: 20px;
  & p {
    font-size: 30px;
  }
`;
