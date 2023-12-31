import { IsLoading } from "components/PageLayout";
import TodoItem from "components/TodoCollection/TodoItem";
import TodoModal from "components/TodoCollection/TodoModal";
import { useTodo } from "hooks";
import useOverlay from "hooks/useOverlay";
import { FaPlus } from "react-icons/fa6";
import { useMenuStore } from "store";
import { styled } from "styled-components";

const Todo = () => {
  const overlay = useOverlay();
  const { menu, tag } = useMenuStore();
  const { response } = useTodo();
  const { data: allTodos, isError, isLoading } = response;

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

  const onClickStartForm = async () => {
    await openPromiseToModal();
  };

  if (isLoading && allTodos === null && allTodos === undefined) return <IsLoading />;
  if (isError) return <p>isError</p>;

  let Todos = allTodos;
  let todoListTitle = "";

  switch (menu) {
    case "all":
      todoListTitle = "미완료";
      Todos = allTodos?.filter(item => item.isDone === false);
      break;
    case "10":
      todoListTitle = "완료";
      Todos = allTodos!.filter(item => item.isDone === true);
      break;
    case "20":
      todoListTitle = "중요";
      Todos = allTodos!.filter(item => item.important === true && item.isDone === false);
      break;
  }

  if (!Todos) return <IsLoading />;

  if (tag !== "전체태그") {
    Todos = Todos.filter(item => item.tag.includes(tag));
  }

  return (
    <StWrapper>
      <StTodosHeader>
        <p>{todoListTitle}</p>
        <FaPlus className="todoPlus_button" onClick={onClickStartForm} />
      </StTodosHeader>
      <StWrapperTodos>
        {Todos?.sort((a, b) => b.id - a.id).map(item => {
          return <TodoItem key={item.id} item={item} />;
        })}
      </StWrapperTodos>
    </StWrapper>
  );
};
export default Todo;

const StWrapper = styled.div`
  margin: 20px;
`;

const StWrapperTodos = styled.div`
  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 20px;

  width: 100%;

  padding: 10px;

  place-items: center;
`;

const StTodosHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  height: 35px;

  margin-bottom: 20px;

  & p {
    font-size: 30px;
  }
`;
