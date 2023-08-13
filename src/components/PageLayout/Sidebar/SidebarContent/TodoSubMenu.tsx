import {
  CheckOutlined,
  AppstoreOutlined,
  StarOutlined,
  TagsOutlined,
  MinusOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps } from "antd/es/menu";
import useMenuStore from "store/useMenuStore";
import { PiCheckFatBold } from "react-icons/pi";
import { PiCheckFatFill } from "react-icons/pi";
import { styled } from "styled-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTags } from "api/tags";
import { BaseModal } from "components/common";
import { useState } from "react";
import TagAddtionModal from "../SidebarTagModal/TagAddtionModal";
import TagDeletionModal from "../SidebarTagModal/TagDeletionModal";
import useOverlay from "hooks/useOverlay";
import { FaCircle } from "react-icons/fa";

type MenuItem = Required<MenuProps>["items"][number];

const TodoSubMenu = () => {
  const overlay = useOverlay();
  // TODO question : 밖으로 빼두신 부분 안으로 옮겼는데 밖으로 빼둔 이유가 있을까요???
  const queryClient = useQueryClient();
  const {
    data: allTags,
    isLoading,
    isError
  } = useQuery(["TagsCollection"], () => getTags("jieun2563@naver.com"));

  const { tag, menu, changeMenu, changeTag } = useMenuStore();

  if (isLoading) return <div>로딩중</div>;

  const tagItemsArr = allTags.map((tagItem: string, index: string) => {
    // return getItem(tagItem, String(index + 41));
    let color = "";
    // TODO 색상 정하기
    if (tagItem === "edu") color = "#ffadd2";
    else if (tagItem === "work") color = "#ffbb96";
    else if (tagItem === "exercise") color = "#b7eb8f";
    else if (tagItem === "chore") color = "#91caff";
    else if (tagItem === "entertain") color = "#d3adf7";
    return getItem(tagItem, tagItem, <FaCircle style={{ fill: color }} />);
  });
  // tagItemsArr.unshift(getItem("전체태그", "40"));
  // getItem 두번째 파라미터가 zustand 상태관리로 보내지는거, 첫 파라미터가 눈에 보이는 이름
  tagItemsArr.unshift(getItem("전체태그", "전체태그", <AppstoreOutlined />));

  const stateItems: MenuItem[] = [
    getItem("미완료", "1", <PiCheckFatBold />),
    getItem("완료", "10", <PiCheckFatFill />),
    getItem("중요", "20", <StarOutlined />)
  ];

  const tagItems: MenuItem[] = [getItem("태그", "30", <TagsOutlined />, tagItemsArr, "group")];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type
    } as MenuItem;
  }

  // 선택된 거
  let selectedKeyforState = "1";
  let selectedKeyfortag = "전체태그";
  if (menu) {
    for (let i = 0; i < stateItems.length; i++) {
      if (stateItems[i]!.key === menu) {
        selectedKeyforState = String(stateItems[i]!.key);
        break;
      }
    }
    for (let i = 0; i < tagItems.length; i++) {
      if (tagItems[i]!.key === tag) {
        selectedKeyfortag = String(tagItems[i]!.key);
        break;
      }
    }
  }

  const openPromiseAddTagModal = () =>
    new Promise(resolve => {
      overlay.open(({ close }) => (
        <TagAddtionModal
          allTags={allTags}
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

  const openPromiseDeleteTagModal = () =>
    new Promise(resolve => {
      overlay.open(({ close }) => (
        <TagDeletionModal
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

  return (
    <StTodoSubMenuWrapper>
      {/* <StDeletionTagPosition>
        <PlusOutlined className="tagplus" onClick={openPromiseAddTagModal} />
      </StDeletionTagPosition>
      <StAdditionTagPosition>
        <MinusOutlined className="tagminus" onClick={openPromiseDeleteTagModal} />
      </StAdditionTagPosition> */}
      <Menu
        defaultSelectedKeys={[selectedKeyforState]}
        mode="inline"
        items={stateItems}
        onSelect={({ item, key, keyPath, selectedKeys, domEvent }) => {
          changeMenu(key);
        }}
      />
      <Menu
        defaultSelectedKeys={[selectedKeyfortag]}
        mode="inline"
        items={tagItems}
        onSelect={({ item, key, keyPath, selectedKeys, domEvent }) => {
          changeTag(key);
        }}
      />
    </StTodoSubMenuWrapper>
  );
};

export default TodoSubMenu;

const StTodoSubMenuWrapper = styled.div`
  position: relative;
`;

const StAdditionTagPosition = styled.div`
  position: absolute;
  /* z-index: 1; */
  right: 20px;
  top: 148px;
`;
const StDeletionTagPosition = styled.div`
  position: absolute;
  /* z-index: 1; */
  right: 50px;
  top: 148px;
`;
