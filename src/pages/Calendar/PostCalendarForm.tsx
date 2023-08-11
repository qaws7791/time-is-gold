import { Button, DatePicker, DatePickerProps, Input, Space, Switch, Typography } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { FormEvent, useState } from "react";
import useScheduleIdStore from "store/useScheduleStore";
import { postData } from "supabase/db";
import { TColor } from "./Calendar.type";
import { ColorSelect, FlexBox, StyleForm } from "./CalendarForm.style";
import useInputForm from "./useInputForm";

const PostCalendarForm = () => {
  const { selectDate } = useScheduleIdStore();

  const initialValue = {
    email: "",
    title: "",
    start: selectDate[0],
    end: selectDate[1],
    backgroundColor: "#FFD1DF" as TColor
  };

  const { inputValue, setInputValue, register, colorRegister } = useInputForm(initialValue);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postData(inputValue);
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
    <StyleForm onSubmit={onSubmit}>
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
      <FlexBox>
        <ColorSelect {...colorRegister("#FFD1DF")} defaultChecked />
        <ColorSelect {...colorRegister("#FFE0B2")} />
        <ColorSelect {...colorRegister("#D0F0C0")} />
        <ColorSelect {...colorRegister("#B3E0FF")} />
        <ColorSelect {...colorRegister("#E6CCE6")} />
      </FlexBox>
      <Button type="primary" htmlType="submit">
        작성하기
      </Button>
      <Space wrap size={"middle"}></Space>
    </StyleForm>
  );
};
export default PostCalendarForm;
