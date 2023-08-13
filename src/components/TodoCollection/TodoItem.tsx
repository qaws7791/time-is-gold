// TODO tag는 후순위로 미루기 (할 때 datatype등 다시 설정해줘야함)
import { ITodo } from "supabase/database.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkTodoImportance, switchTodo } from "api/todo";
import { styled } from "styled-components";
import "../../icon.css";
import useOverlay from "hooks/useOverlay";
import TodoUpdateModal from "./TodoUpdateModal";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { PiCheckFatBold, PiCheckFatFill } from "react-icons/pi";
import { getTags } from "api/tags";
import { Tag } from "antd";

type Props = {
  item: ITodo;
};

export type isDoneType = { isDone: boolean };
const TodoItem = ({ item }: Props) => {
  const overlay = useOverlay();
  const {
    data: allTags,
    isLoading: allTagsIsLoading,
    isError: allTagsIsError
  } = useQuery(["TagsCollection"], () => getTags("jieun2563@naver.com"));

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
  if (!allTags) return <p>로딩중</p>;

  return (
    <>
      {/* {isStartForm && <TodoUpdateForm item={item} setIsStartForm={setIsStartForm} />} */}
      <StTodoCardWrapper onClick={openPromiseToUpdateModal}>
        <StCardHeader>
          <TodoTitle>{item.title}</TodoTitle>
          {/* <FaCheck className={isDoneIconCss} onClick={e => onClickSwitchHandler(e)} /> */}
          {/* <FaCheck className={isDoneIconCss} onClick={e => onClickSwitchHandler(e)} /> */}
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

        {/* <button>{item.isDone ? "미완료" : "완료"}</button> */}
        <StTagBox>
          {item.tag?.map(tagPiece => {
            let tagColor = "";
            if (tagPiece === "edu") tagColor = "magenta";
            else if (tagPiece === "work") tagColor = "volcano";
            else if (tagPiece === "exercise") tagColor = "green";
            else if (tagPiece === "chore") tagColor = "blue";
            else if (tagPiece === "entertain") tagColor = "purple";
            // if (tagPiece === "1") tagColor = "#FFD1DF";
            // else if (tagPiece === "2") tagColor = "#FFE0B2";
            // else if (tagPiece === "3") tagColor = "#D0F0C0";
            // else if (tagPiece === "4") tagColor = "#B3E0FF";
            // else if (tagPiece === "5") tagColor = "#E6CCE6";
            return (
              <Tag key={tagPiece} color={tagColor}>
                {/* <FaCircle style={{ fill: tagColor }} /> */}
                {tagPiece}
              </Tag>
            );
          })}
        </StTagBox>
        <StTodoDeadLineDate>~{item.deadLineDate}</StTodoDeadLineDate>
      </StTodoCardWrapper>
    </>
  );
};

export default TodoItem;

const StTodoCardWrapper = styled.div`
  position: relative;

  width: 355px;
  height: 250px;

  margin: 10px;

  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
  border-color: #d6d6d6;
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
  font-size: 16px;
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
  bottom: 15px;
  right: 15px;

  color: gray;
  font-size: 17px;
`;

const StTagBox = styled.div`
  display: flex;
  flex-direction: row;

  margin-left: 30px;
`;
