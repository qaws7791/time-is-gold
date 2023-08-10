import { Button, DatePicker, DatePickerProps, Input, Space, Switch, Typography } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FormEvent, useState } from "react";
import { patchData } from "supabase/db";
import type { IScheduleUpdate, TColor } from "./Calendar.type";
import { ColorSelect, FlexBox, StyleForm } from "./CalendarForm.style";
import useInputForm from "./useInputForm";

dayjs.extend(customParseFormat);

interface IProps {
  IsModifyHandler: () => void;
  item: IScheduleUpdate;
}

const ModifyCalendarForm = ({ IsModifyHandler, item }: IProps) => {
  const initialValue = {
    title: "",
    start: item.start,
    end: item.end,
    backgroundColor: "#FFD1DF" as TColor
  };

  const { inputValue, setInputValue, register, colorRegister } = useInputForm(initialValue);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    patchData(item.id, inputValue);
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
      <Input {...register("title")} size="large" placeholder={item.title} />
      <Space size={40}>
        <Typography.Text keyboard={true}>하루 종일</Typography.Text>
        <Switch defaultChecked onChange={allDayCheckHandler} />
      </Space>
      {(isAllDay && (
        <DatePicker.RangePicker
          defaultValue={[dayjs(item.start), dayjs(item.end)]}
          onChange={onChangDateHandler}
        />
      )) || (
        <DatePicker.RangePicker
          defaultValue={[dayjs(item.start), dayjs(item.end)]}
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
      <Space wrap size={"middle"}>
        <Button type="default" onClick={IsModifyHandler}>
          취소
        </Button>
        <Button type="primary" htmlType="submit">
          저장
        </Button>
      </Space>
    </StyleForm>
  );
};
export default ModifyCalendarForm;
