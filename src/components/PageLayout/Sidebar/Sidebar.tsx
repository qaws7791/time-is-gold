import { Layout } from "antd";
import useViewport from "hooks/useViewport";
import { useMenuStore } from "store";
import SidebarContent from "./SidebarContent";
import SidebarMenu from "./SidebarMenu";

const { Sider } = Layout;

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar = ({ open, setOpen }: Props) => {
  const { page } = useMenuStore();
  const { width } = useViewport();
  return (
    <Sider
      width={width < 800 ? "100%" : 360}
      breakpoint="xl"
      collapsedWidth="0"
      style={{
        backgroundColor: "#ffffff"
      }}
      trigger={null}
      collapsible
      collapsed={open}
      onCollapse={value => setOpen(value)}
    >
      <SidebarMenu page={page} />
      <SidebarContent page={page} />
    </Sider>
  );
};
