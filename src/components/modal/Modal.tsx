import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IColumn, IModalMessage, IRow } from "../../interfaces/interfaces";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newItem: IRow) => void;
  columns: IColumn[];
  existingData: IRow | null;
  loading?: boolean;
  error?: string;
  message: IModalMessage | null;
  setMessage: React.Dispatch<React.SetStateAction<IModalMessage | null>>;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  onAdd,
  columns,
  existingData,
  loading = false,
  error = "",
  message,
  setMessage,
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
    setMessage(null);
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onAdd(newItem);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {message && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}
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
              disabled={loading}
              error={Boolean(error)}
            />
          ))}

        {error && (
          <Typography color="error" mt={1}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" disabled={loading}>
          {existingData ? "Save Changes" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
