import { AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps } from "antd/es/menu";
import ColorDot from "components/ColorDot";
import useMenuStore from "store/useMenuStore";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return { key, icon, children, label } as MenuItem;
}

const items: MenuItem[] = [
  getItem("전체보기", "all", <AppstoreOutlined />),
  getItem("카테고리 1", "#FFD1DF", <ColorDot color="#FFD1DF" />),
  getItem("카테고리 2", "#FFE0B2", <ColorDot color="#FFE0B2" />),
  getItem("카테고리 3", "#D0F0C0", <ColorDot color="#D0F0C0" />),
  getItem("카테고리 4", "#B3E0FF", <ColorDot color="#B3E0FF" />),
  getItem("카테고리 5", "#E6CCE6", <ColorDot color="#E6CCE6" />)
];

const CalendarSubMenu = () => {
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
      onSelect={({ key }) => changeMenu(key)}
    />
  );
};

export default CalendarSubMenu;
