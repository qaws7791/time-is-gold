import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTags } from "api/tags";
import { BaseModal } from "components/common";
import useClickOutside from "hooks/useClickOutside";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

interface Props {
  allTags: string[];
  onConfirm: () => void;
  onClose: () => void;
}

const TagAddtionModal: React.FC<Props> = ({ allTags, onConfirm, onClose }) => {
  // [tagAddition form] modal 외부영역 선택시 닫힘
  const ref = useRef<HTMLFormElement>(null);
  useClickOutside(ref, () => onClose());

  // [tagAddition form] for 'modal 브라우저 화면 줄일 때 닫힘' =>
  // window 초기 크기 저장 & 크기 useState로 관리
  const wannaKnow = useRef({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // [tagAddition form] input 영역 관리
  const [newTag, setNewTag] = useState<string>("");
  const [notice, setNotice] = useState<string>("");

  const queryClient = useQueryClient();
  const todoTagUpdateMutation = useMutation(updateTags, {
    onSuccess: () => {
      queryClient.invalidateQueries(["TagsCollection"]);
    }
  });

  // 태그 수 10개 이상일 경우 tag 추가버튼 비활성화
  let tagAdditionController = false;

  const onChangeNewTagHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (allTags.length >= 10) {
      tagAdditionController = true;
      setNotice("추가가능한 최대 태그수는 10개입니다. 추가를 원하시면 기존 태그를 삭제해주세요.");
      return false;
    } else {
      tagAdditionController = false;
    }
    const lastIndex = e.target.value.length - 1;
    if (e.target.value[lastIndex] === " ") {
      setNotice("tag에 공백이 들어갈 수 없습니다.");
      return false;
    } else {
      setNotice("");
    }
    if (e.target.value.length > 13) {
      setNotice("tag의 최대글자수는 13글자입니다.");
      return false;
    } else {
      setNotice("");
    }
    setNewTag(e.target.value);
  };

  const onSubmitTagsHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 얘는 submit 버튼 비활성화에서 이미 막고 있어서 없어도 될 것 같은데 일단 넣어둠.
    if (allTags.length >= 10) {
      return false;
    }

    if (allTags.includes(newTag)) {
      alert("같은 이름으로된 태그가 존재합니다");
      return false;
    }

    if (newTag.length === 0) {
      alert("태그를 입력해주세요");
      return false;
    }

    const updatedTags = [...allTags, newTag];
    todoTagUpdateMutation.mutate({ userId: "jieun2563@naver.com", updatedTags });
    setNewTag("");
    onConfirm();
  };

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  useEffect(() => {
    if (windowSize.width !== wannaKnow.current.width) onClose();
    if (windowSize.height !== wannaKnow.current.height) onClose();
  }, [windowSize]);

  useEffect(() => {
    // 초기 마운트 시에도 크기를 설정
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);
    // 컴포넌트가 언마운트될 때 리스너 해제
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 빈 배열은 마운트와 언마운트 시에만 실행됨

  return (
    <BaseModal name="tagChanger">
      <StPlusTagForm ref={ref} onSubmit={onSubmitTagsHandler}>
        <div>
          <input
            type="text"
            value={newTag}
            onChange={onChangeNewTagHandler}
            placeholder="새로운 태그 입력"
          />
          {notice && <StNoticeText>{notice}</StNoticeText>}
        </div>
        <StButtons>
          <button type="submit" disabled={tagAdditionController}>
            추가
          </button>
          <button type="button" onClick={() => onClose()}>
            닫기
          </button>
        </StButtons>
      </StPlusTagForm>
    </BaseModal>
  );
};

export default TagAddtionModal;

const StPlusTagForm = styled.form`
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
  & input {
    width: 100px;
    margin-bottom: 10px;
  }
`;

const StNoticeText = styled.p`
  font-size: 13px;
`;

const StButtons = styled.div`
  display: flex;
  gap: 10px;
`;
