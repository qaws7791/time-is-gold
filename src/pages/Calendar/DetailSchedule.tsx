import { PoweroffOutlined } from "@ant-design/icons";
import { Button, DatePicker, Space, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useScheduleIdStore from "store/useScheduleStore";
import { deleteData, getFilteredSchedulesData } from "supabase/db";
import type { IScheduleUpdate } from "./Calendar.type";
import ModifyCalendarForm from "./ModifyCalendarForm";

const DetailSchedule = () => {
  // 수정 폼 전환 상태
  const [isModify, setIsModify] = useState(false);
  const IsModifyHandler = () => setIsModify(!isModify);

  // Click한 Event Id 전역에서 가져오기
  const { targetId } = useScheduleIdStore();
  const [filteredEvent, setFilteredEvent] = useState<IScheduleUpdate>();

  // GET SCHEDULE
  useEffect(() => {
    const getFilteredSchedule = async () => {
      const filteredSchedule = await getFilteredSchedulesData(targetId);
      setFilteredEvent(filteredSchedule);
    };
    getFilteredSchedule();
  }, [targetId]);

  // TODO useQuery 사용해서 isLoading 사용
  if (filteredEvent === undefined)
    return <Button type="text" icon={<PoweroffOutlined />} loading />;

  return (
    <>
      {(isModify && (
        <ModifyCalendarForm IsModifyHandler={IsModifyHandler} item={filteredEvent} />
      )) || (
        <Space direction={"vertical"} size={"middle"}>
          <Typography.Title level={3}>{filteredEvent.title}</Typography.Title>
          <DatePicker.RangePicker
            defaultValue={[dayjs(filteredEvent.start), dayjs(filteredEvent.end)]}
          />
          <Space wrap size={"middle"}>
            <Button type="primary" danger onClick={() => deleteData(filteredEvent.id)}>
              삭제
            </Button>
            <Button type="primary" onClick={IsModifyHandler}>
              편집
            </Button>
          </Space>
        </Space>
      )}
    </>
  );
};
export default DetailSchedule;
