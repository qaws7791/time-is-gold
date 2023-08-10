import { CheckOutlined, AppstoreOutlined, StarOutlined, TagsOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps } from "antd/es/menu";
import useMenuStore from "store/useMenuStore";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  getItem("전체", "1", <AppstoreOutlined />),
  getItem("중요", "10", <StarOutlined />),
  getItem("완료", "20", <CheckOutlined />),
  getItem(
    "태그",
    "30",
    <TagsOutlined />,
    [getItem("태그 1", "41"), getItem("태그 2", "42")],
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
  let selectedKey = "1";
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
      onSelect={({ item, key, keyPath, selectedKeys, domEvent }) => {
        console.log(key);
        changeMenu(key);
      }}
    />
  );
};

export default TodoSubMenu;
