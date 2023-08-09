import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./Calendar.css";
import { EventData } from "./Calendar.type";

const Calendar = () => {
  const plugin = [
    dayGridPlugin, // 월간 달력 // day 그리드
    timeGridPlugin, // 주간, 일간 달력 // time 그리드 보기
    interactionPlugin
    /* 이벤트를 위한 플러그인
    일정 추가/수정 : 캘린더에 새 이벤트를 추가하거나 기존 이벤트를 수정 
      : 이벤트를 클릭하면 이벤트 정보를 수정하는 팝업이나 모달 띄움
    드래그 앤 드롭 : 마우스로 드래그하여 다른 날짜나 시간으로 이동
    리사이징 : 기간을 변경하여 이벤트의 기간을 늘이거나 줄임
    일정 클릭 이벤트
    */
  ];

  const handleEventClick = (event: any) => {
    // 이벤트 클릭 시 처리할 로직
    console.log(event);
    // alert("eventInfo");
  };

  return (
    // <Div>
    <FullCalendar
      // dayMinWidth={100} // 넣을 수 있는 값 확인 안됨
      // slotMinWidth={100} // 확인 안됨
      // eventMinWidth={100} // 확인 안됨
      // height={} // 높이 지정
      plugins={plugin}
      initialView="dayGridMonth" // 초기뷰 dayGridMonth or timeGridWeek
      headerToolbar={{
        left: "prev,next today prevYear,nextYear",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay"
      }}
      /* 
          headerToolbar {
            title : text containing the current month/week/day 
            현재 월 / 일 / 년 의 텍스트
            prev : button for moving the calendar back one month/week/day
            이전 버튼
            next : button for moving the calendar forward one month/week/day
            다음 버튼
            prevYear : button for moving the calendar back on year
            이전 년도
            nextYear : button for moving the calendar forward one year
            다음 년도
            today : button for moving the calendar to the current month/week/day
            오늘로 이동
          }
          footerToolbar : headerToolbar와 동일한 옵션
        */
      //

      // titleFormat={{ year: "numeric", month: "short", day: "numeric" }}
      // eventDisplay="flex" // 타임 백그라운드 사라짐 // 안쓸듯

      // eventBackgroundColor="yellow" // 이벤트 배경색 미지정시 디폴트값으로 활용 가능
      // eventBorderColor="yellow" // 이벤트 보더색 미지정시 디폴트값으로 활용 가능
      // eventColor="blue" // eventBackgroundColor & eventBorderColor 두 값이 같을 때 // 우선순위 낮음
      //
      // navLinks={true} // 무슨 기능인지
      // navLinkDayClick={"무슨기능이니?"} // 무슨 기능인지
      // navLinkWeekClick={"무슨기능이니?"} // 무슨 기능인지
      // navLinkHint={"무슨 기능이니?"} // 무슨 기능인지

      buttonText={{
        // prev: "이전", // 부트스트랩 아이콘으로 변경 가능
        // next: "다음",
        // prevYear: "이전 년도",
        // nextYear: "다음 년도",
        // today: "오늘",
        month: "월별",
        week: "주별",
        day: "일별",
        list: "리스트"
      }}
      /* 버튼 텍스트 default {{
          prev: "이전",
          next: "다음",
          prevYear: "이전 년도",
          nextYear: "다음 년도",
          today: "오늘",
          month: "월별",
          week: "주별",
          day: "일별",
        }} */

      events={events} // 표시 할 data
      // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
      eventClick={event => handleEventClick(event)} // 이벤트 클릭 이벤트 처리
      // eventContent={fn(): node {} || true} // 일정 커스텀
      eventsSet={function () {}} // called after events are initialized/added/changed/removed
      eventAdd={function () {}}
      eventChange={function () {}}
      eventRemove={function () {}}
      editable={true} // 이벤트 추가/수정, 드래그 앤 드롭 활성화
      //

      selectable={true} // day or time 선택 가능
      selectMirror={true} // time 선택시 시간 표현
      // select={function () {}}

      dayMaxEvents={true}
      // weekends={} boolean state 필요
    />
    //  </Div>
  );
};

export default Calendar;

// 임시 data
const events: EventData[] = [
  // Todo Supabase 에서 GET 하기
  {
    title: "단일 date",
    start: "2023-08-07T10:00:00",
    end: "2023-08-07T14:00:00"
  }, // end는 optional date
  {
    title: "단일 date",
    start: "2023-08-05",
    backgroundColor: "#727272",
    textColor: "#ffffff",
    borderColor: "#000000"
  }, // end는 optional date
  { title: "단일 date", start: "2023-08-07", end: "2023-08-06" }, // end가 start보다 작아도 에러를 띄우지 않음
  { title: "복수 date", start: "2023-08-09", end: "2023-08-12" }
];
