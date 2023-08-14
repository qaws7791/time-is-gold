import { MenuOutlined } from "@ant-design/icons";
import { Button, Layout, Typography } from "antd";
import { useDialog } from "hooks/useDialog";
import { AuthError, logout } from "supabase/auth";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ open, setOpen }: IProps) => {
  const { openDialog } = useDialog();

  const logOutHandler = () => {
    try {
      logout();
      openDialog({ type: "alert", title: "로그아웃 성공", content: "안녕히 가세요." });
    } catch (error) {
      if (error instanceof AuthError) {
        openDialog({ type: "alert", title: "로그아웃 성공", content: error.message });
      }
    }
  };

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
      <Button onClick={logOutHandler}>로그아웃</Button>
    </AntHeader>
  );
};
