import { AppstoreOutlined, StarOutlined, TagsOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps } from "antd/es/menu";
import useMenuStore from "store/useMenuStore";
import { PiCheckFatBold } from "react-icons/pi";
import { PiCheckFatFill } from "react-icons/pi";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getTags } from "api/tags";
import { FaCircle } from "react-icons/fa";

type MenuItem = Required<MenuProps>["items"][number];

const TodoSubMenu = () => {
  const { data: allTags, isLoading } = useQuery(["TagsCollection"], () =>
    getTags("jieun2563@naver.com")
  );

  const { tag, menu, changeMenu, changeTag } = useMenuStore();

  if (isLoading) return <div>로딩중</div>;

  const tagItemsArr = allTags.map((tagItem: string, index: string) => {
    let color = "";
    if (tagItem === "edu") color = "#ffadd2";
    else if (tagItem === "work") color = "#ffbb96";
    else if (tagItem === "exercise") color = "#b7eb8f";
    else if (tagItem === "chore") color = "#91caff";
    else if (tagItem === "entertain") color = "#d3adf7";
    return getItem(tagItem, tagItem, <FaCircle style={{ fill: color }} />);
  });

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

  return (
    <StTodoSubMenuWrapper>
      <Menu
        defaultSelectedKeys={[selectedKeyforState]}
        mode="inline"
        items={stateItems}
        onSelect={({ key }) => {
          changeMenu(key);
        }}
      />
      <Menu
        defaultSelectedKeys={[selectedKeyfortag]}
        mode="inline"
        items={tagItems}
        onSelect={({ key }) => {
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
