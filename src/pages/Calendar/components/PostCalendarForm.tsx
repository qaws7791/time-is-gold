import { Button, DatePicker, DatePickerProps, Form, Input, Space, Switch, Typography } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { useCalendarForm, useSchedule } from "hooks";
import { useState } from "react";
import { useModalStore, useScheduleIdStore } from "store";
import type { TBackgroundColor } from "supabase/database.types";
import { ColorSelect } from "../Calendar.style";

export const PostCalendarForm = () => {
  const { selectDate } = useScheduleIdStore();

  const initialValue = {
    email: "",
    title: "",
    start: selectDate[0],
    end: selectDate[1],
    backgroundColor: "#FFD1DF" as TBackgroundColor
  };

  const { inputValue, setInputValue, register, colorRegister } = useCalendarForm(initialValue);
  const { postMutation } = useSchedule();
  const { closeModal } = useModalStore();

  // event: FormEvent<HTMLFormElement>
  // event.preventDefault();
  const onSubmit = async () => {
    postMutation.mutate(inputValue);
    closeModal("postCalendarForm");
  };

  const [isAllDay, setIsAllDay] = useState(true);
  const allDayCheckHandler = (checked: boolean) => setIsAllDay(checked);

  const onChangDateHandler = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    setInputValue({ ...inputValue, start: dateString[0], end: dateString[1] });
  };

  return (
    <Form onFinish={onSubmit}>
      <Input {...register("email")} size="large" placeholder="email" />
      <Input {...register("title")} size="large" placeholder="Title" />
      <Space size={40}>
        <Typography.Text keyboard={true}>하루 종일</Typography.Text>
        <Switch defaultChecked onChange={allDayCheckHandler} />
      </Space>
      {(isAllDay && (
        <DatePicker.RangePicker
          defaultValue={[dayjs(selectDate[0]), dayjs(selectDate[1])]}
          onChange={onChangDateHandler}
        />
      )) || (
        <DatePicker.RangePicker
          defaultValue={[dayjs(selectDate[0]), dayjs(selectDate[1])]}
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
          onChange={onChangDateHandler}
        />
      )}
      <Space>
        <ColorSelect {...colorRegister("#FFD1DF")} defaultChecked />
        <ColorSelect {...colorRegister("#FFE0B2")} />
        <ColorSelect {...colorRegister("#D0F0C0")} />
        <ColorSelect {...colorRegister("#B3E0FF")} />
        <ColorSelect {...colorRegister("#E6CCE6")} />
      </Space>
      <Button type="primary" htmlType="submit">
        작성하기
      </Button>
      <Space wrap size={"middle"}></Space>
    </Form>
  );
};