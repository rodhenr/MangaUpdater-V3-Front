export interface IData {
  columns: IColumn[];
  rows: IRow[];
}

export interface IColumn {
  isAdd: boolean;
  isEditable: boolean;
  field: string;
  headerName: string;
}

export interface IRow {
  id: number;
  [key: string]: string | number | null;
}

export interface IModalMessage {
  type: "success" | "error";
  text: string;
}
