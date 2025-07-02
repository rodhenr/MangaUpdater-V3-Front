import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  deleteMangaSource,
  postMangaSource,
} from "../../../api/mangasource/mangasource.commands";
import { fetchPagedMangaSources } from "../../../api/mangasource/mangasource.queries";
import {
  ICreateMangaSourceData,
  IPagedMangaSourceResponse,
} from "../../../api/mangasource/mangasource.types";
import Modal from "../../../components/modal/Modal";
import { IModalMessage, IRow } from "../../../interfaces/interfaces";

const columns = [
  { isAdd: false, isEditable: false, field: "id", headerName: "ID" },
  { isAdd: true, isEditable: true, field: "mangaId", headerName: "ID Manga" },
  { isAdd: false, isEditable: false, field: "mangaName", headerName: "Manga" },
  { isAdd: true, isEditable: true, field: "sourceId", headerName: "ID Source" },
  {
    isAdd: false,
    isEditable: false,
    field: "sourceName",
    headerName: "Source",
  },
  { isAdd: true, isEditable: true, field: "url", headerName: "URL" },
];

export const MangaSource = () => {
  const queryClient = useQueryClient();
  const pageSize = 12;

  const [pageNumber, setPageNumber] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [newItem, setNewItem] = useState<IRow | null>(null);
  const [message, setMessage] = useState<IModalMessage | null>(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] =
    useState<IPagedMangaSourceResponse | null>(null);
  const [deleteMessage, setDeleteMessage] = useState<IModalMessage | null>(
    null
  );

  const {
    data: sourceList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mangaSource", { pageNumber, pageSize }],
    queryFn: fetchPagedMangaSources,
  });

  const mutation = useMutation({
    mutationFn: postMangaSource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mangaSource"] });
      setMessage({ type: "success", text: "Item saved successfully!" });

      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    },
    onError: () => {
      setMessage({ type: "error", text: "Failed to save item." });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMangaSource,
    onSuccess: () => {
      setDeleteMessage({
        type: "success",
        text: "Item deleted successfully!",
      });

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["mangaSource"] });
        setOpenDeleteDialog(false);
        setSelectedItemToDelete(null);
        setDeleteMessage(null);
      }, 2000);
    },
    onError: () => {
      setDeleteMessage({
        type: "error",
        text: "Failed to delete item. Please try again.",
      });
    },
  });

  const handleOpenModal = (
    item: IRow | IPagedMangaSourceResponse | null = null
  ) => {
    setMessage(null);

    if (item === null) {
      setNewItem(null);
    } else {
      setNewItem({
        id: item.id,
        mangaId: item.mangaId,
        sourceId: item.sourceId,
        url: item.url,
      });
    }

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewItem(null);
  };

  const handleAddNewItem = async (item: IRow) => {
    const data: ICreateMangaSourceData = {
      mangaId: Number(item.mangaId),
      sourceId: Number(item.sourceId),
      url: String(item.url),
    };

    try {
      await mutation.mutateAsync(data);
    } catch {
      // handled via onError
    }
  };

  const handleOpenDeleteDialog = (item: IPagedMangaSourceResponse) => {
    setSelectedItemToDelete(item);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedItemToDelete) {
      deleteMutation.mutate(selectedItemToDelete.id);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedItemToDelete(null);
    setDeleteMessage(null);
  };

  if (isLoading) {
    return (
      <Stack alignItems="center" mt={4}>
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack alignItems="center" mt={4}>
        <Typography color="error">Failed to load manga sources.</Typography>
      </Stack>
    );
  }

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal(null)}
        >
          Add New
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Manga</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Aditional Info</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sourceList?.items.map((item: IPagedMangaSourceResponse) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.mangaName}</TableCell>
                <TableCell>{item.sourceName}</TableCell>
                <TableCell>{item.url}</TableCell>
                <TableCell>{item.aditionalInfo}</TableCell>
                <TableCell
                  sx={{
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenModal(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleOpenDeleteDialog(item)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" justifyContent="center" mt={4}>
        <Pagination
          count={sourceList?.totalPages || 0}
          page={pageNumber}
          onChange={(_, page) => setPageNumber(page)}
          color="primary"
        />
      </Stack>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        onAdd={handleAddNewItem}
        columns={columns}
        existingData={newItem}
        message={message}
        setMessage={setMessage}
      />

      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        {deleteMessage && (
          <Alert severity={deleteMessage.type} sx={{ mb: 2 }}>
            {deleteMessage.text}
          </Alert>
        )}
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
