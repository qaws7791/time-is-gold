import CalendarSubMenu from "./CalendarSubMenu";
import MiniCalendar from "./MiniCalendar";
import TodoSubMenu from "./TodoSubMenu";

interface Props {
  page: string;
}

const SidebarContent = ({ page }: Props) => {
  if (page === "todo")
    return (
      <>
        <TodoSubMenu />
      </>
    );
  else
    return (
      <>
        <MiniCalendar />
        <CalendarSubMenu />
      </>
    );
};

export default SidebarContent;
