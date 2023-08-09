export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      Schedules: {
        Row: {
          // the data expected from .select()
          id: number;
          email: string;
          title: string;
          date: string;
          startTime: string;
          endTime: string;
          category: string;
          // data: Json | null;
        };
        Insert: {
          email: string;
          title: string;
          date: string;
          startTime: string;
          endTime: string;
          category: number;
        };
        Update: {
          // the data to be passed to .update()
          id?: never;
          name?: string; // `not null` columns are optional on .update()
          data?: Json | null;
        };
      };
    };
  };
}
