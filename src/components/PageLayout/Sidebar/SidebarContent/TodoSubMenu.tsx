import { AppstoreOutlined, CheckOutlined, StarOutlined, TagsOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps } from "antd/es/menu";
import useMenuStore from "store/useMenuStore";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  getItem("전체", "all", <AppstoreOutlined />),
  getItem("중요", "important", <StarOutlined />),
  getItem("완료", "completed", <CheckOutlined />),
  getItem(
    "태그",
    "tags",
    <TagsOutlined />,
    [getItem("태그 1", "tag-tag1"), getItem("태그 2", "tag-tag2")],
    "group"
  )
];

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

const TodoSubMenu = () => {
  const { menu, changeMenu } = useMenuStore();
  let selectedKey = "all";
  if (menu) {
    for (let i = 0; i < items.length; i++) {
      if (items[i]!.key === menu) {
        selectedKey = String(items[i]!.key);
        break;
      }
    }
  }

  return (
    <Menu
      defaultSelectedKeys={[selectedKey]}
      mode="inline"
      items={items}
      selectedKeys={[menu]}
      onSelect={({ item, key, keyPath, selectedKeys, domEvent }) => {
        changeMenu(key);
      }}
    />
  );
};

export default TodoSubMenu;
