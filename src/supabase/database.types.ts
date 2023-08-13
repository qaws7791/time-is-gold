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
      todos: {
        Row: {
          id: number;
          email: string;
          title: string;
          content: string;
          isDone: boolean;
          tag: string[] | undefined;
          deadLineDate: string | undefined;
          important: boolean;
        };
        Insert: {
          id?: never;
          email: string;
          title: string;
          content: string;
          isDone: boolean;
          tag: string[];
          deadLineDate: string | undefined;
          important: boolean;
        };
        Update: {
          id?: never;
          email: string;
          title: string;
          content: string;
          isDone: boolean;
          tag: string[];
          deadLineDate: string | undefined;
          important: boolean;
        };
      };
      Schedules: { Row: ISchedulesRow; Insert: ISchedulesInsert; Update: ISchedulesUpdate };
    };
  };
}

export type ITodo = Database["public"]["Tables"]["todos"]["Row"];
export type ITodoForInsert = Database["public"]["Tables"]["todos"]["Insert"];
export type ITodoForUpdate = Database["public"]["Tables"]["todos"]["Update"];
