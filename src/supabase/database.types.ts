export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

// TODO tag는 없어도 되는 친구 같은데.. 그럼 type을 어떻게 해야하나 빈배열도.. undefined? 해주나? 지금은 key value 객체로 넣고 있고 있긴한데 나중에 넣게되면 배열 형태로 넣을거임
// TODO update 는
export interface ITag {
  [key: string]: boolean;
}
export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          // the data expected from .select()
          id: number;
          email: string;
          title: string;
          content: string;
          isDone: boolean;
          tag: ITag;
          deadLineDate: string | undefined;
        };
        Insert: {
          // the data to be passed to .insert()
          // id?: never; // generated columns must not be supplied
          id?: never; // generated columns must not be supplied
          email: string;
          title: string;
          content: string;
          isDone: boolean;
          tag: ITag;
          deadLineDate: string | undefined;
        };
        Update: {
          // the data to be passed to .update()
          id?: never; // generated columns must not be supplied
          email: string;
          title: string;
          content: string;
          isDone: boolean;
          tag: ITag;
          deadLineDate: string | undefined;
        };
      };
    };
  };
}

export type ITodo = Database["public"]["Tables"]["todos"]["Row"];
export type ITodoforInsert = Database["public"]["Tables"]["todos"]["Insert"];
export type ITodoforUpdate = Database["public"]["Tables"]["todos"]["Update"];
// export type ITodoforDelete = Database["public"]["Tables"]["todos"]["Delete"];
