import { Calendar, theme } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useMenuStore } from "store";

const MiniCalendar: React.FC = () => {
  const { date, changeDate } = useMenuStore();
  const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG
  };

  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log("onPanelChange: ", value.format("YYYY-MM-DD"), mode);
  };

  const onSelect = (date: Dayjs, info: { source: "year" | "month" | "date" | "customize" }) => {
    console.log("onSelect: ", date.format("YYYY-MM-DD"), info);
  };

  const onDateChange = (date: Dayjs) => {
    const formattedDate = date.format("YYYY-MM-DD");
    console.log("onChange: ", formattedDate);
    changeDate(formattedDate);
  };

  return (
    <div style={wrapperStyle}>
      <Calendar
        fullscreen={false}
        defaultValue={date ? undefined : dayjs()}
        onPanelChange={onPanelChange}
        onSelect={onSelect}
        onChange={onDateChange}
        value={date ? dayjs(date) : dayjs()}
      />
    </div>
  );
};

export default MiniCalendar;
