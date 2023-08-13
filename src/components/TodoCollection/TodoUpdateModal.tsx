import { BaseModal } from "components/common";
import { ITodo } from "supabase/database.types";
import TodoUpdateForm from "./TodoUpdateForm";

interface Props {
  item: ITodo;
  onConfirm: () => void;
  onClose: () => void;
}

const TodoUpdateModal: React.FC<Props> = ({ item, onConfirm, onClose }) => {
  return (
    <BaseModal>
      <TodoUpdateForm item={item} onConfirm={onConfirm} onClose={onClose} />
    </BaseModal>
  );
};

export default TodoUpdateModal;
