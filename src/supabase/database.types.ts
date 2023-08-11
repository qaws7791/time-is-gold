export type TBackgroundColor = "#FFD1DF" | "#FFE0B2" | "#D0F0C0" | "#B3E0FF" | "#E6CCE6";

export interface ISchedulesRow {
  id: string;
  email: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: TBackgroundColor;
}

export interface ISchedulesInsert {
  email: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: TBackgroundColor;
}

export interface ISchedulesUpdate {
  id?: never;
  title?: string;
  start?: string;
  end?: string;
  backgroundColor?: string;
}

export interface Database {
  public: {
    Tables: {
      Schedules: { Row: ISchedulesRow; Insert: ISchedulesInsert; Update: ISchedulesUpdate };
    };
  };
}
