type ColorValue = string;

export interface EventData {
  title: string;
  start: Date | string;
  allDay?: boolean;
  end?: Date | string;
  backgroundColor?: ColorValue;
  borderColor?: ColorValue;
  textColor?: ColorValue;
  id: number;
}
