import type { DateSelectArg, EventChangeArg, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import Modal from "components/common/Modal/Modal";
import { useEffect, useState } from "react";
import useModalStore, { IModalStatus } from "store/useModalStore";
import useScheduleIdStore from "store/useScheduleStore";
import { getSchedulesData, patchData } from "supabase/db";
import "./Calendar.css";
import { IScheduleUpdate } from "./Calendar.type";
import DetailSchedule from "./DetailSchedule";
import PostCalendarForm from "./PostCalendarForm";

const Calendar = () => {
  const [events, setEvents] = useState<IScheduleUpdate[]>();

  useEffect(() => {
    const getSchedules = async () => {
      const schedule = await getSchedulesData();
      setEvents(schedule);
    };
    getSchedules();
  }, []);

  const { modalStatus, openModal } = useModalStore(state => state);
  const modalOpen = (target: keyof IModalStatus) => openModal(target);

  const { getTargetId, getDate } = useScheduleIdStore();
  const eventClick = (info: EventClickArg) => {
    getTargetId(info.event.id);
    modalOpen("detailSchedule");
  };

  const eventChange = (info: EventChangeArg) => {
    const { title, startStr: start, endStr: end, id, backgroundColor } = info.event;
    const updatedData = { title, start, end, id, backgroundColor };
    patchData(id, updatedData);
  };

  const select = (info: DateSelectArg) => {
    getDate([info.startStr, info.endStr]);
    modalOpen("postCalendarForm");
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{ left: "title", right: "dayGridMonth,timeGridWeek,timeGridDay today" }}
        views={{
          dayGridMonth: { titleFormat: { year: "numeric", month: "long" } },
          week: {
            titleFormat: { month: "long", day: "numeric" },
            dayHeaderFormat: { weekday: "short", day: "numeric" }
          },
          day: {
            titleFormat: { month: "long", day: "numeric" },
            dayHeaderFormat: { weekday: "short", day: "numeric" }
          }
        }}
        footerToolbar={{ left: "prevYear,prev", center: "writeButton", right: "next,nextYear" }}
        customButtons={{ writeButton: { text: "작성", click: () => {} } }}
        buttonText={{ today: "오늘", month: "월별", week: "주별", day: "일별" }}
        events={events}
        eventClick={eventClick}
        eventChange={eventChange}
        editable={true}
        selectable={true}
        selectMirror={true}
        select={select}
        weekends={true}
        dayMaxEvents={true}
        navLinks={true}
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

export default Calendar;
