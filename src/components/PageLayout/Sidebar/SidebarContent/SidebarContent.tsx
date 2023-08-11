import MiniCalendar from './MiniCalendar'
import TodoSubMenu from './TodoSubMenu'
import CalendarSubMenu from './CalendarSubMenu'

interface Props {
  page: string;
}

const SidebarContent = ({page}:Props) => {
  if(page === 'todo')
  return (
    <><TodoSubMenu/></>
  )
  else return (
    <>
    <MiniCalendar/>
    <CalendarSubMenu/>
    </>
  )
}

export default SidebarContent