import { Tag } from "antd";
import { useTodo } from "hooks";
import useOverlay from "hooks/useOverlay";
import { PiCheckFatBold, PiCheckFatFill } from "react-icons/pi";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { styled } from "styled-components";
import { ITodo } from "supabase/database.types";
import "../../icon.css";
import TodoUpdateModal from "./TodoUpdateModal";

type Props = {
  item: ITodo;
};

export type isDoneType = { isDone: boolean };
const TodoItem = ({ item }: Props) => {
  const overlay = useOverlay();

  const { todoIsDoneMutation, todoImportantMutation } = useTodo();

  const onClickSwitchHandler = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    todoIsDoneMutation.mutate({ id: item.id, isDone: !item.isDone });
  };

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

  if (!item) return <p>로딩중</p>;

  const showTag = item.tag?.map(tagPiece => {
    let tagColor = "";
    if (tagPiece === "edu") tagColor = "magenta";
    else if (tagPiece === "work") tagColor = "volcano";
    else if (tagPiece === "exercise") tagColor = "green";
    else if (tagPiece === "chore") tagColor = "blue";
    else if (tagPiece === "entertain") tagColor = "purple";
    return (
      <Tag key={tagPiece} color={tagColor}>
        {tagPiece}
      </Tag>
    );
  });

  return (
    <StTodoCardWrapper onClick={openPromiseToUpdateModal}>
      <StCardHeader>
        <TodoTitle>{item.title}</TodoTitle>
        {item.isDone ? (
          <PiCheckFatFill className="black isDoneCheck" onClick={e => onClickSwitchHandler(e)} />
        ) : (
          <PiCheckFatBold className="black isDoneCheck" onClick={e => onClickSwitchHandler(e)} />
        )}
      </StCardHeader>
      <StCardBody>
        <ContentIconBox>
          <TodoContent>{item.content}</TodoContent>
          {item.important ? (
            <TiStarFullOutline className="star" onClick={onClickCheckImportance} />
          ) : (
            <TiStarOutline className="star" onClick={onClickCheckImportance} />
          )}
        </ContentIconBox>
      </StCardBody>

      <StTagBox>{showTag}</StTagBox>
      <StTodoDeadLineDate>~{item.deadLineDate}</StTodoDeadLineDate>
    </StTodoCardWrapper>
  );
};

export default TodoItem;

const StTodoCardWrapper = styled.div`
  position: relative;

  width: 355px;
  height: 250px;

  margin: 10px;
  padding: 10px;

  background-color: white;
  border: 1px solid #d6d6d6;
  border-radius: 20px;

  cursor: pointer;
`;

const StCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 20%;

  padding: 10px 20px;

  border-bottom: 1px solid #eee;

  box-sizing: border-box;
  gap: 0 15px 0 0;
`;

const TodoTitle = styled.p`
  width: 250px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const StCardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  height: 60%;

  padding: 0 20px;
`;

const ContentIconBox = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 5px;
  gap: 10px;
`;

const TodoContent = styled.p`
  width: 90%;

  margin-top: 5px;

  font-size: 15px;
  font-weight: 550;
  line-height: 25px;
`;

const StTodoDeadLineDate = styled.p`
  position: absolute;
  bottom: 20px;
  right: 20px;

  color: gray;
  font-size: 17px;
`;

const StTagBox = styled.div`
  display: flex;
  flex-direction: row;

  margin-left: 30px;
`;
