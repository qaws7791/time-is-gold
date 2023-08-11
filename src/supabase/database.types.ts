export interface ISchedulesRow {
  id: number;
  email: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
}

export interface ISchedulesInsert {
  email: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: number;
}

export interface ISchedulesUpdate {
  id?: never;
  title?: string;
  start?: string;
  end?: string;
  backgroundColor?: number;
}

export interface Database {
  public: {
    Tables: {
      Schedules: { Row: ISchedulesRow; Insert: ISchedulesInsert; Update: ISchedulesUpdate };
    };
  };
}
