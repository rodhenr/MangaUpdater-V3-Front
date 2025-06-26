// components/modal/Modal.tsx
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IColumn, IRow } from "../../interfaces/interfaces";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newItem: IRow) => void;
  columns: IColumn[];
  existingData: IRow | null;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  onAdd,
  columns,
  existingData,
}) => {
  const [newItem, setNewItem] = useState<IRow>({ id: 0 });

  useEffect(() => {
    if (existingData) {
      setNewItem(existingData);
    } else {
      const initialData: IRow = { id: 0 };
      columns.forEach((column) => {
        initialData[column.field] = "";
      });
      setNewItem(initialData);
    }
  }, [columns, existingData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onAdd(newItem);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{existingData ? "Edit Item" : "Add New Item"}</DialogTitle>
      <DialogContent>
        {columns
          .filter((x) => x.isAdd)
          .map((column) => (
            <TextField
              key={column.field}
              label={column.headerName}
              name={column.field}
              value={newItem[column.field] || ""}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              sx={{
                "& .MuiInputBase-input": {
                  color: "black !important",
                },
              }}
            />
          ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          {existingData ? "Save Changes" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
