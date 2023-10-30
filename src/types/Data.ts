
export interface DataItem {
  id: number;
  date: number;
  emotion: number;
  content: string;
}

export interface Action {
  type: "CREATE" | "REMOVE" | "EDIT";
  data?: DataItem;
  targetId?: number;
}