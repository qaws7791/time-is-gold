import React from 'react'
import {
  AppstoreOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import useMenuStore from 'store/useMenuStore';
import ColorDot from 'components/ColorDot';


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}


const items: MenuItem[] = [
  getItem('전체보기', '1', <AppstoreOutlined />),
  getItem('카테고리 1', '10', <ColorDot color='#d8d3fd'/>), 
  getItem('카테고리 2', '20', <ColorDot color='#e3f1f6'/>),
  getItem('카테고리 3', '30', <ColorDot color='#e2f4e7'/>),
  getItem('카테고리 4', '40', <ColorDot color='#fbefd9'/>),
  getItem('카테고리 5', '50', <ColorDot color='#e5e5e5'/>),
];

// const CATEGORY_COLORS = {
//   red: "#ff0000",
//   green: "#00ff00",
// }

// CATEGORY_COLORS['red']

const CalendarSubMenu = () => {
  const { menu, changeMenu } = useMenuStore()
  let selectedKey = '1'
  if(menu) {
      for (let i = 0; i < items.length; i++) {
        if (items[i]!.key === menu) {
          selectedKey = String(items[i]!.key);
          break
        }
      }
  }

  return (
    <Menu
        defaultSelectedKeys={[selectedKey]}
        mode='inline'
        items={items}
        onSelect={({ item, key, keyPath, selectedKeys, domEvent })=>{
          console.log(key)
          changeMenu(key)
        }}
    />
  )
}

export default CalendarSubMenu