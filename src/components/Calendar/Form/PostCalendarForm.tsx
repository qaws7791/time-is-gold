import { Button, DatePicker, Form, Input, Space, Switch, Typography } from "antd";
import dayjs from "dayjs";
import { useCalendarForm, useSchedule } from "hooks";
import { useState } from "react";
import { useCurrentUser, useModalStore, useScheduleStore } from "store";
import type { TBackgroundColor } from "supabase/database.types";
import { ColorSelect } from "./Form.style";

export const PostCalendarForm = () => {
  const { selectDate } = useScheduleStore();
  const start = selectDate[0];
  const end = selectDate[1];
  const { currentUserEmail: email } = useCurrentUser();

  const initialValue = {
    email,
    title: "",
    start,
    end,
    backgroundColor: "#FFD1DF" as TBackgroundColor
  };

  const { inputValue, setInputValue, register, colorRegister } = useCalendarForm(initialValue);
  const { postMutation } = useSchedule();
  const { closeModal } = useModalStore();

  const onSubmit = async () => {
    postMutation.mutate(inputValue);
    closeModal("postCalendarForm");
  };

  const [isAllDay, setIsAllDay] = useState(true);
  const allDayCheckHandler = (checked: boolean) => setIsAllDay(checked);

  const onChangDateHandler = () => setInputValue({ ...inputValue, start, end });

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      style={{ width: 350 }}
      onFinish={onSubmit}
    >
      <Form.Item label="제목" name="title">
        <Input {...register("title")} size="large" placeholder="Title" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 3 }}>
        <Space size={150}>
          <Typography.Text keyboard={true}>하루 종일</Typography.Text>
          <Switch defaultChecked onChange={allDayCheckHandler} />
        </Space>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 15, offset: 3 }} name="range-picker" label="일정">
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
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 2 }}>
        <ColorSelect {...colorRegister("#FFD1DF")} defaultChecked />
        <ColorSelect {...colorRegister("#FFE0B2")} />
        <ColorSelect {...colorRegister("#D0F0C0")} />
        <ColorSelect {...colorRegister("#B3E0FF")} />
        <ColorSelect {...colorRegister("#E6CCE6")} />
      </Form.Item>
      <Form.Item style={{ display: "flex", justifyContent: "center" }}>
        <Space size={"middle"}>
          <Button type="primary" htmlType="submit">
            작성하기
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
