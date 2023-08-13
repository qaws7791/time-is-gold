import { BaseModal } from "components/common";
import TodoForm from "./TodoForm";

interface Props {
  onConfirm: () => void;
  onClose: () => void;
}

const TodoModal = ({ onConfirm, onClose }: Props) => {
  return (
    <BaseModal>
      <TodoForm onConfirm={onConfirm} onClose={onClose} />
    </BaseModal>
  );
};

export default TodoModal;
