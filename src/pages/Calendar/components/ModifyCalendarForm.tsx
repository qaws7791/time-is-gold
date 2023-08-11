import { Button, DatePicker, DatePickerProps, Form, Input, Space, Switch, Typography } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useCalendarForm, useSchedule } from "hooks";
import { useState } from "react";
import type { ISchedulesRow } from "supabase/database.types";
import { ColorSelect } from "../Calendar.style";

dayjs.extend(customParseFormat);

interface IProps {
  IsModifyHandler: () => void;
  selectedSchedule: ISchedulesRow;
}

export const ModifyCalendarForm = ({ IsModifyHandler, selectedSchedule }: IProps) => {
  const { id, title, start, end, backgroundColor } = selectedSchedule;

  const initialValue = { title, start, end, backgroundColor };

  const {
    inputValue: updateValue,
    setInputValue: setUpdateValue,
    register,
    colorRegister
  } = useCalendarForm(initialValue);
  const { patchMutation } = useSchedule();

  const onSubmit = () => {
    patchMutation.mutate({ updateValue, id });
    IsModifyHandler();
  };

  const [isAllDay, setIsAllDay] = useState(true);
  const allDayCheckHandler = (checked: boolean) => setIsAllDay(checked);

  const onChangDateHandler = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    setUpdateValue({ ...updateValue, start: dateString[0], end: dateString[1] });
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      style={{ width: 350 }}
      onFinish={onSubmit}
    >
      <Form.Item label="제목" name="title">
        <Input
          {...register("title")}
          defaultValue={selectedSchedule.title}
          size="large"
          placeholder={title}
        />
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
            defaultValue={[dayjs(start), dayjs(end)]}
            onChange={onChangDateHandler}
          />
        )) || (
          <DatePicker.RangePicker
            defaultValue={[dayjs(start), dayjs(end)]}
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
          <Button type="default" onClick={IsModifyHandler}>
            취소
          </Button>
          <Button type="primary" htmlType="submit">
            저장
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
