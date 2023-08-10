import { Typography } from 'antd';
import styled from 'styled-components';
import { DownOutlined,CalendarOutlined,EditOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { Link } from 'react-router-dom';

const { Text,Title } = Typography;

const DropdownArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  cursor: pointer;
  background-color: #ffffff;
  &:hover {
    background-color: #eee;
  }
`

const IconWrapper = styled.div`
  display: inline-block;
  
`

const TextWrapper = styled.div`
  
`

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`
const items: MenuProps['items'] = [
  {
    label: <Link to="/todo">Todo</Link>,
    key: '0',
  },
  {
    type: 'divider',
  },
  {
    label: <Link to="/calendar">Calendar</Link>,
    key: '1',
  },
];

const SidebarMenu = ({ page }:{page:string}) => {

  return (
    <Dropdown menu={{ items }} trigger={['click']}> 
      <DropdownArea onClick={e=>e.preventDefault()}>
        <Content>
        <IconWrapper>
          {page === 'todo' ? 
          <EditOutlined style={{fontSize: '40px'}}/> 
          : <CalendarOutlined style={{fontSize: '40px'}}/>}
        
        </IconWrapper>
        <TextWrapper>
          <Title level={4}>{page === 'todo' ? 'Todo' : 'Calendar'}</Title>
          <Text>My workspace</Text>
        </TextWrapper>
        </Content>
        <DownOutlined  style={{fontSize: '20px'}}/>
      </DropdownArea>
    </Dropdown>
  )
}

export default SidebarMenu