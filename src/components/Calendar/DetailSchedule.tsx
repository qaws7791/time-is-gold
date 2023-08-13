import { PoweroffOutlined } from "@ant-design/icons";
import { Button, DatePicker, Space, Typography } from "antd";
import dayjs from "dayjs";
import { useSchedule } from "hooks";
import { useState } from "react";
import { useModalStore } from "store";
import { ModifyCalendarForm } from "./Form/ModifyCalendarForm";

export const DetailSchedule = () => {
  // Modify Form으로 전환하는 상태
  const [isModify, setIsModify] = useState(false);
  const IsModifyHandler = () => setIsModify(!isModify);

  const { closeModal } = useModalStore(state => state);

  const { selectedData, deleteMutation } = useSchedule();
  console.log("selectedData :", selectedData);

  const { data: selectedSchedule, isError, isLoading } = selectedData;

  const deleteHandler = () => {
    deleteMutation.mutate(selectedSchedule.id);
    closeModal("detailSchedule");
  };

  if (isLoading && selectedSchedule === undefined) {
    return <Button type="text" icon={<PoweroffOutlined />} loading />;
  }

  if (isError) return <p>에러</p>;

  const { title, start, end } = selectedSchedule;

  return (
    <>
      {(isModify && (
        <ModifyCalendarForm IsModifyHandler={IsModifyHandler} selectedSchedule={selectedSchedule} />
      )) || (
        <Space direction={"vertical"} size={"middle"}>
          <Typography.Title level={3}>{title}</Typography.Title>
          <DatePicker.RangePicker defaultValue={[dayjs(start), dayjs(end)]} />
          <Space size={"middle"} style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" danger onClick={deleteHandler}>
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
