import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IColumn, IRow } from "../../interfaces/interfaces";
import "../../styles/EditableTable.scss";

interface EditableTableProps {
  columns: IColumn[];
  rows: IRow[];
}

const EditableTable: React.FC<EditableTableProps> = ({ columns, rows }) => {
  const [editRowId, setEditRowId] = useState<number | string | null>(null);
  const [rowData, setRowData] = useState<IRow[]>(rows);
  const [tempRowData, setTempRowData] = useState<IRow | null>(null);

  useEffect(() => {
    setRowData(rows);
    setTempRowData(null);
    setEditRowId(null);
  }, [rows]);

  const handleEditClick = (row: IRow) => {
    setEditRowId(row.id);
    setTempRowData({ ...row });
  };

  const handleCancelClick = () => {
    setEditRowId(null);
    setTempRowData(null);
  };

  const handleSaveClick = () => {
    if (!tempRowData) return;

    setRowData((prevRows) =>
      prevRows.map((row) => (row.id === editRowId ? tempRowData : row))
    );
    setEditRowId(null);
    setTempRowData(null);
  };

  const handleDeleteClick = (id: number | string) => {
    const rows = rowData.filter((x) => x.id !== id);

    setRowData(rows);
    setEditRowId(null);
    setTempRowData(null);
  };

  const handleInputChange = (field: string, value: string | number) => {
    if (!tempRowData) return;

    setTempRowData((prev) => {
      return {
        ...prev,
        [field]: value,
      } as IRow;
    });
  };

  const renderRows = () =>
    rowData.map((row) => (
      <TableRow key={row.id} className="table-body">
        {columns.map((column) => (
          <TableCell key={column.field} className="MuiTableCell-root">
            {editRowId === row.id && column.isEditable ? (
              <TextField
                value={tempRowData?.[column.field] || ""}
                onChange={(e) =>
                  handleInputChange(column.field, e.target.value)
                }
                size="small"
                className="text-field-container"
              />
            ) : (
              row[column.field]
            )}
          </TableCell>
        ))}
        <TableCell className="MuiTableCell-root">
          {editRowId === row.id ? (
            <div className="buttons-container">
              <Button
                onClick={handleSaveClick}
                color="primary"
                variant="contained"
              >
                Save
              </Button>
              <Button
                onClick={handleCancelClick}
                color="secondary"
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteClick(row.id)}
                color="secondary"
                variant="contained"
              >
                Delete
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => handleEditClick(row)}
              color="primary"
              variant="contained"
            >
              Edit
            </Button>
          )}
        </TableCell>
      </TableRow>
    ));

  return (
    <Table className="table">
      <TableHead className="table-head">
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.field} className="MuiTableCell-root">
              {column.headerName}
            </TableCell>
          ))}
          <TableCell className="MuiTableCell-root">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{renderRows()}</TableBody>
    </Table>
  );
};

export default EditableTable;
