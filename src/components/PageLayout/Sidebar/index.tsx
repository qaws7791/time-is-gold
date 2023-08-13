import { Layout } from 'antd'
import SidebarMenu from './SidebarMenu'
import SidebarContent from './SidebarContent'
import useMenuStore from 'store/useMenuStore'
import useViewport from 'hooks/useViewport'

const { Sider } = Layout

interface Props {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}



const Sidebar = ({open, setOpen}:Props) => {
  const { page } = useMenuStore()
  const {width} = useViewport()
  return (
    <Sider
    width={width < 800 ? '100%': 360}
    breakpoint="xl"
    collapsedWidth="0"
    style={{
      backgroundColor:'#ffffff',
    }}
    // trigger={!collapsed && null}
    trigger={null}
    // onBreakpoint={(broken) => {
    //   console.log(broken);
    // }}
    collapsible collapsed={open} onCollapse={(value) => setOpen(value)}
  >
    <SidebarMenu page={page}/>
    <SidebarContent page={page}/>
  </Sider>
  )
}

export default Sidebar