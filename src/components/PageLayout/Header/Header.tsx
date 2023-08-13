
import { MenuOutlined } from '@ant-design/icons';
import { Layout,Button,Typography } from 'antd';
import LoginStore from "store/LoginStore";
import { useNavigate } from 'react-router';
const {Header:AntHeader} = Layout;
const {Text,Title} = Typography;

const Header = ({
  open,
  setOpen,
}:{
  open:boolean,
  setOpen:React.Dispatch<React.SetStateAction<boolean>>,
}) => {
  const { logoutHandler } = LoginStore();
  const navigate = useNavigate();
  return (
    <AntHeader style={{
      padding:'0 15px',
      backgroundColor:'#ffffff',
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      }}
    >
    <Button
      type="text"
      // icon={open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      icon={<MenuOutlined />}
      onClick={() => setOpen(!open)}
      style={{
        fontSize: '16px',
        width: 64,
        height: 64,
      }}
    />
      <Title level={3} style={{margin:0}}>시간은 금이다</Title>
      <Button
        onClick={
          async () => {
          await logoutHandler();
          navigate('/login');
        }
      }
      >
        로그아웃
      </Button>
    </AntHeader>
  )
}

export default Header