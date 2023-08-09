import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { getSchedulesData } from "supabase/db";
import "./Calendar.css";

const Calendar = () => {
  // TODO: any[] type 바꿔주기
  const [events, setEvents] = useState<any[]>();

  // GET logic schedule
  useEffect(() => {
    const data = async () => {
      const schedule = await getSchedulesData();
      setEvents(schedule);
    };
    data();
  }, []);

  // POST logic schedule
  const postSchedule = () => {};

  // PATCH logic schedule
  const patchSchedule = () => {};

  // DELETE logic schedule
  const deleteSchedule = () => {};

  return (
    <FullCalendar
      // height={"100vh"} // 높이 지정
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{ left: "title", right: "dayGridMonth,timeGridWeek,timeGridDay today" }}
      footerToolbar={{ left: "prevYear,prev", right: "next,nextYear" }}
      // titleFormat={{ year: "numeric", month: "short", day: "numeric" }}

      buttonText={{ today: "오늘", month: "월별", week: "주별", day: "일별" }}
      events={events}
      eventClick={function () {
        // 수정 모달 or 상세보기
        console.log("eventClick");
      }}
      // eventContent={function () {}} // 일정 커스텀

      eventsSet={function () {
        // console.log("eventsSet");
      }}
      eventAdd={function (event) {
        console.log(event, "eventAdd");
      }}
      eventChange={function (event) {
        // 드로그 & 드롭 발생시
        console.log("이벤트 수정 로직", event, "eventChange");
      }}
      eventDragStart={function () {
        // 드래그 발생시
        console.log("eventDragStart");
      }}
      eventDrop={function () {
        // 드롭 발생시
        console.log("eventDrop");
      }}
      eventRemove={function () {
        console.log("eventRemove");
      }}
      editable={true} // 이벤트 추가/수정, 드래그 앤 드롭 활성화
      selectable={true} // day or time 선택 가능
      selectMirror={true} // time 선택시 시간 표현
      select={function (event) {
        // post 모달 띄우기
        // day 선택시 (다중 선택 가능)
        console.log(event, event.startStr, event.endStr, "select");
      }}
      // weekends={} boolean state 필요

      /* Event Style */
      // eventDisplay="flex" // 타임 백그라운드 사라짐 // 안쓸듯
      // eventBackgroundColor="yellow" // 이벤트 배경색 미지정시 디폴트값으로 활용 가능
      // eventBorderColor="yellow" // 이벤트 보더색 미지정시 디폴트값으로 활용 가능
      // TODO post 할 때 유저가 색상 선택을 필수할건지?
      // 필수가 된다면 필요없는 옵션이고
      // 색상 선택 옵셔널한 값이면 디폴트 필요함
      // eventColor="blue" // eventBackgroundColor & eventBorderColor 두 값이 같을 때 // 우선순위 낮음

      /* 미확인 기능 */
      dayMaxEvents={true}
      // navLinks={true} // 기능 확인 안됨
      // navLinkDayClick={} // 기능 확인 안됨
      // navLinkWeekClick={} // 기능 확인 안됨
      // navLinkHint={} // 기능 확인 안됨

      // dayMinWidth={100} // 기능 확인 안됨
      // slotMinWidth={100} // 기능 확인 안됨
      // eventMinWidth={100} // 기능 확인 안됨
    />
  );
};

export default Calendar;
