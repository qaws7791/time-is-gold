// tag 삭제시 todo에 있는 해당 tag도 삭제해야함.
/* tag 삭제버튼 누르면 → 
  1. [supabase] tags table에 email일치 항목 -> filter 해주기
  2. [supabase] Todos table에 로그인 사용자의 todo 다 가져와서 전부 filtring하고 다시 넣어주기
      -  email일치 todo들 다 가져오기
      -  각 todo

*/

import { BaseModal } from "components/common";
import useClickOutside from "hooks/useClickOutside";
import { useRef } from "react";
import { styled } from "styled-components";

interface Props {
  onConfirm: () => void;
  onClose: () => void;
}

const TagDeletionModal: React.FC<Props> = ({ onConfirm, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => onClose());
  return (
    <BaseModal name="tagChanger">
      <StMinusTagdiv ref={ref}>
        <p>고민중</p>
        <StButtons>
          <button>삭제</button>
          <button onClick={() => onClose()}>닫기</button>
        </StButtons>
      </StMinusTagdiv>
    </BaseModal>
  );
};

export default TagDeletionModal;

const StMinusTagdiv = styled.div`
  background-color: #fff;
  padding: 25px 10px;
  border-radius: 10px;
  width: 200px;
  height: 140px;
  position: absolute;
  top: 330px;
  left: 370px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const StNoticeText = styled.p`
  font-size: 13px;
`;

const StButtons = styled.div`
  display: flex;
  gap: 10px;
`;
