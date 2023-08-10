// TODO tag는 후순위로 미루기 (할 때 datatype등 다시 설정해줘야함)
import { ITodo } from "supabase/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkTodoImportance, switchTodo } from "api/todo";
import { styled } from "styled-components";
import { AiOutlineCheck } from "react-icons/ai";
import "../../icon.css";
import useOverlay from "hooks/useOverlay";
import TodoUpdateModal from "./TodoUpdateModal";
import { TiStarFullOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";

type Props = {
  item: ITodo;
};

export type isDoneType = { isDone: boolean };
const TodoItem = ({ item }: Props) => {
  const overlay = useOverlay();

  const queryClient = useQueryClient();

  const todoIsDoneMutation = useMutation(switchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    }
  });

  const todoImportantMutation = useMutation(checkTodoImportance, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    }
  });

  const onClickSwitchHandler = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    const todoIsDone: boolean = !item.isDone;
    todoIsDoneMutation.mutate({ id: item.id, todoIsDone });
  };
  // const onClickUpdateHandler = () => {
  //   setIsStartForm(true);
  // };
  const isDoneIconCss = item.isDone ? "black isDoneCheck" : "gray isDoneCheck";

  const openPromiseToUpdateModal = () =>
    new Promise(resolve => {
      overlay.open(({ close }) => (
        <TodoUpdateModal
          item={item}
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

  const onClickCheckImportance = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    const important: boolean = !item.important;
    todoImportantMutation.mutate({ id: item.id, important });
  };
  return (
    <>
      {/* {isStartForm && <TodoUpdateForm item={item} setIsStartForm={setIsStartForm} />} */}
      <StTodoCardWrapper onClick={openPromiseToUpdateModal}>
        <StCardHeader>
          <h3>{item.title}</h3>
          <AiOutlineCheck className={isDoneIconCss} onClick={e => onClickSwitchHandler(e)} />
        </StCardHeader>
        <StCardBody>
          {item.important ? (
            <TiStarFullOutline className="star" onClick={onClickCheckImportance} />
          ) : (
            <TiStarOutline className="star" onClick={onClickCheckImportance} />
          )}
          <p>{item.content}</p>
          <p>~{item.deadLineDate}</p>
          {/* <button>{item.isDone ? "미완료" : "완료"}</button> */}
        </StCardBody>
      </StTodoCardWrapper>
    </>
  );
};

export default TodoItem;

const StTodoCardWrapper = styled.div`
  border: 1px solid black;
  margin: 10px;
  cursor: pointer;
  width: 300px;
  height: 200px;
`;

const StCardHeader = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
`;

const StCardBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;
