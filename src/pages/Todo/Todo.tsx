import { useQuery } from "@tanstack/react-query";
import { getTodos } from "components/api/todo";
import TodoItem from "./TodoItem";

const Todo: React.FC = () => {
  const { data: Todos, isLoading, isError } = useQuery(["todos"], getTodos);

  if (isLoading) return <div>내 투두 주이소</div>;
  if (isError) return <div>에러남</div>;
  if (Todos) console.log(Todos);
  return (
    <div>
      {Todos?.map(item => {
        return <TodoItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Todo;

/*
데이터를 쿼리하려면 정책이 필요합니다.
이 테이블에서 데이터를 쿼리하려면 먼저 액세스 정책을 작성해야 합니다. 정책이 없으면 이 테이블을 쿼리하면 빈 결과 배열이 생성됩니다.

이 테이블을 생성한 후 정책을 생성할 수 있습니다.
*/
