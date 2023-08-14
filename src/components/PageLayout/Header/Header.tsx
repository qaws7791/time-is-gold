import { MenuOutlined } from "@ant-design/icons";
import { Button, Layout, Typography } from "antd";
import { logout } from "supabase/auth";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ open, setOpen }: IProps) => {
  return (
    <AntHeader
      style={{
        padding: "0 15px",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setOpen(!open)}
        style={{ fontSize: "16px", width: 64, height: 64 }}
      />
      <Title level={3} style={{ margin: 0 }}>
        시간은 금이다
      </Title>
      <Button onClick={logout}>로그아웃</Button>
    </AntHeader>
  );
};
