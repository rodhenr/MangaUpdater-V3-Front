import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { IColumn, IRow } from "../../interfaces/interfaces";

interface EditableTableProps {
  columns: IColumn[];
  rows: IRow[];
  edit: boolean;
}

const EditableTable: React.FC<EditableTableProps> = ({ columns, rows }) => {
  const paginationModel = { page: 0, pageSize: 10 };

  const transformedColumns: GridColDef[] = columns.map((column) => {
    if (column.field === "id") {
      return { ...column, width: 75 };
    }

    if (column.field.toLowerCase().endsWith("id")) {
      return { ...column, width: 150 };
    }

    return { ...column, flex: 1, minWidth: 100 };
  });

  return (
    <Paper
      sx={{
        height: "600px",
        width: "100%",
        bgcolor: "#121212",
        color: "#fff",
      }}
    >
      <DataGrid
        rows={rows}
        columns={transformedColumns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </Paper>
  );
};

export default EditableTable;
