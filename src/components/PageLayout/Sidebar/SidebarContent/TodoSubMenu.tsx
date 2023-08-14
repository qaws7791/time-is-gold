import { AppstoreOutlined, StarOutlined, TagsOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps } from "antd/es/menu";
import { FaCircle } from "react-icons/fa";
import { PiCheckFatBold, PiCheckFatFill } from "react-icons/pi";
import useMenuStore from "store/useMenuStore";
import { styled } from "styled-components";
import { allTags } from "../tag.data";

type MenuItem = Required<MenuProps>["items"][number];

const TodoSubMenu = () => {
  const { tag, menu, changeMenu, changeTag } = useMenuStore();

  const tagItemsArr = allTags.map(tagItem =>
    getItem(tagItem.label, tagItem.label, <FaCircle style={{ fill: tagItem.color }} />)
  );
  tagItemsArr.unshift(getItem("전체태그", "전체태그", <AppstoreOutlined />));
  const tagItems: MenuItem[] = [getItem("태그", "30", <TagsOutlined />, tagItemsArr, "group")];

  const stateItems: MenuItem[] = [
    getItem("미완료", "all", <PiCheckFatBold />),
    getItem("완료", "10", <PiCheckFatFill />),
    getItem("중요", "20", <StarOutlined />)
  ];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return { key, icon, children, label, type } as MenuItem;
  }

  let selectedKeyForState = "all";
  let selectedKeyForTag = "전체태그";
  if (menu) {
    for (let i = 0; i < stateItems.length; i++) {
      if (stateItems[i]!.key === menu) {
        selectedKeyForState = String(stateItems[i]!.key);
        console.log("selectedKeyForState :", selectedKeyForState);
        break;
      }
    }
    for (let i = 0; i < tagItems.length; i++) {
      if (tagItems[i]!.key === tag) {
        selectedKeyForTag = String(tagItems[i]!.key);
        break;
      }
    }
  }

  return (
    <StTodoSubMenuWrapper>
      <Menu
        defaultSelectedKeys={[selectedKeyForState]}
        mode="inline"
        items={stateItems}
        onSelect={({ key }) => changeMenu(key)}
      />
      <Menu
        defaultSelectedKeys={[selectedKeyForTag]}
        mode="inline"
        items={tagItems}
        onSelect={({ key }) => changeTag(key)}
      />
    </StTodoSubMenuWrapper>
  );
};

export default TodoSubMenu;

const StTodoSubMenuWrapper = styled.div`
  position: relative;
`;
