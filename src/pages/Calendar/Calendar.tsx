import type { DateSelectArg, EventChangeArg, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DetailSchedule, PostCalendarForm } from "components/Calendar";
import { Modal } from "components/common";
import { useSchedule } from "hooks";
import { useModalStore, useScheduleStore } from "store";
import "./Calendar.css";

export const Calendar = () => {
  const { response, patchMutation } = useSchedule();

  const { data: scheduleData, isError, isLoading } = response;

  const { modalStatus, openModal } = useModalStore(state => state);

  const { getTargetId, getDate } = useScheduleStore();
  const eventClick = (info: EventClickArg) => {
    getTargetId(info.event.id);
    openModal("detailSchedule");
  };

  const eventChange = (info: EventChangeArg) => {
    const { title, startStr: start, endStr: end, id, backgroundColor } = info.event;
    const updateValue = { title, start, end, backgroundColor };
    patchMutation.mutate({ updateValue, id });
  };

  const select = (info: DateSelectArg) => {
    getDate([info.startStr, info.endStr]);
    openModal("postCalendarForm");
  };

  if (isLoading) {
    return <FullCalendar {...fullCalendarOption} events={[]} />;
  }

  if (isError) {
    return <p>에러</p>;
  }

  return (
    <>
      <FullCalendar
        {...fullCalendarOption}
        events={scheduleData} // 달력에 표시 될 이벤트
        eventClick={eventClick} // 이벤트 클릭시
        eventChange={eventChange} // 이벤트 drop 혹은 resize 될 때
        editable={true} // 사용자의 수정 여부
        selectable={true} // 사용자의 날짜 선택 여부
        selectMirror={true} // 사용자의 시간 선택시 time 표시 여부
        select={select} // 날짜가 선택 될 때
        weekends={true} // 주말 표시 여부
        dayMaxEvents={true} // 하루에 표시 될 최대 이벤트 수 true = 셀의 높이
        navLinks={true} // 달력의 날짜 클릭시 일간 스케쥴로 이동
        navLinkHint={"클릭시 해당 날짜로 이동합니다."}
      />
      {modalStatus.postCalendarForm && (
        <Modal closeTarget="postCalendarForm">
          <PostCalendarForm />
        </Modal>
      )}
      {modalStatus.detailSchedule && (
        <Modal closeTarget={"detailSchedule"}>
          <DetailSchedule />
        </Modal>
      )}
    </>
  );
};

// view type
const year = "numeric";
const month = "long";
const day = "numeric";
const weekday = "short";

const fullCalendarOption: any = {
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  headerToolbar: { left: "title", right: "dayGridMonth,timeGridWeek,timeGridDay today" },
  footerToolbar: { left: "prevYear,prev", right: "next,nextYear" },
  views: {
    dayGridMonth: { titleFormat: { year, month } },
    week: { titleFormat: { month, day }, dayHeaderFormat: { weekday, day } },
    day: { titleFormat: { month, day }, dayHeaderFormat: { weekday, day } }
  },
  buttonText: { today: "오늘", month: "월별", week: "주별", day: "일별" }
};
