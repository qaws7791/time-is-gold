import { Button, Space, Typography } from "antd";
import { IsLoading } from "components/PageLayout";
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

  const { data: selectedSchedule, isError, isLoading } = selectedData;

  const deleteHandler = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate(selectedSchedule.id);
      closeModal("detailSchedule");
    }
  };

  if (isLoading && selectedSchedule === undefined) {
    return <IsLoading />;
  }

  if (isError) return <p>에러</p>;

  const { title, start, end } = selectedSchedule;

  const showDate = (date: string) =>
    date.length === 10 ? dayjs(date).format("YYYY-MM-DD") : dayjs(date).format("YYYY-MM-DD HH:mm");

  return (
    <>
      {(isModify && (
        <ModifyCalendarForm IsModifyHandler={IsModifyHandler} selectedSchedule={selectedSchedule} />
      )) || (
        <Space direction={"vertical"} size={"middle"}>
          <Typography.Title level={3}>{title}</Typography.Title>
          <Typography>{`${showDate(start)} ~ ${showDate(end)}`}</Typography>
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
