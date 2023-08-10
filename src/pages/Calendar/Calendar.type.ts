export type TColor = "#FFD1DF" | "#FFE0B2" | "#D0F0C0" | "#B3E0FF" | "#E6CCE6";

export interface EventData {
  id: number;
  title: string;
  allDay?: boolean;
  start: Date | string;
  end?: Date | string;
  backgroundColor?: TColor;
  borderColor?: TColor;
  textColor?: "#ffffff" | "#000000";
}

export interface ISchedulePost extends ISchedule {
  email: string;
}

export interface IScheduleUpdate extends ISchedule {
  id: string;
}

export interface ISchedule {
  title: string;
  start: string;
  end: string;
  backgroundColor: TColor | string;
}
