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

// TODO tag는 없어도 되는 친구 같은데.. 그럼 type을 어떻게 해야하나 빈배열도.. undefined? 해주나? 지금은 key value 객체로 넣고 있고 있긴한데 나중에 넣게되면 배열 형태로 넣을거임
// TODO update 는
// export interface ITag {
//   [key: string]: boolean;
// }

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
