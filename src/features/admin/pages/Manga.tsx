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
  deleteManga,
  postManga,
  updateManga,
} from "../../../api/manga/manga.commands";
import { fetchPagedMangas } from "../../../api/manga/manga.queries";
import {
  ICreateMangaData,
  IMangaResponse,
  IUpdateMangaData,
} from "../../../api/manga/manga.types";
import Modal from "../../../components/modal/Modal";
import { IModalMessage, IRow } from "../../../interfaces/interfaces";

const columns = [
  { isAdd: false, isEditable: false, field: "id", headerName: "ID" },
  {
    isAdd: true,
    isEditable: true,
    field: "myAnimeListId",
    headerName: "ID MyAnimeList",
  },
  {
    isAdd: true,
    isEditable: true,
    field: "aniListId",
    headerName: "ID Anilist",
  },
  {
    isAdd: true,
    isEditable: true,
    field: "titleRomaji",
    headerName: "Romaji Title",
  },
  {
    isAdd: true,
    isEditable: true,
    field: "titleEnglish",
    headerName: "English Title",
  },
  {
    isAdd: true,
    isEditable: true,
    field: "coverUrl",
    headerName: "Cover URL",
  },
];

export const Manga = () => {
  const pageSize = 12;
  const queryClient = useQueryClient();
  const [pageNumber, setPageNumber] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [newItem, setNewItem] = useState<IRow | null>(null);
  const [message, setMessage] = useState<IModalMessage | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedMangaToDelete, setSelectedMangaToDelete] =
    useState<IMangaResponse | null>(null);
  const [deleteMessage, setDeleteMessage] = useState<IModalMessage | null>(
    null
  );

  const deleteMutation = useMutation({
    mutationFn: deleteManga,
    onSuccess: () => {
      setDeleteMessage({
        type: "success",
        text: "Manga deleted successfully!",
      });

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["manga"] });
        setOpenDeleteDialog(false);
        setSelectedMangaToDelete(null);
        setDeleteMessage(null);
      }, 2000);
    },
    onError: () => {
      setDeleteMessage({
        type: "error",
        text: "Failed to delete manga. Please try again.",
      });
    },
  });

  const handleOpenDeleteDialog = (manga: IMangaResponse) => {
    setSelectedMangaToDelete(manga);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedMangaToDelete) {
      deleteMutation.mutate(selectedMangaToDelete.id);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedMangaToDelete(null);
    setDeleteMessage(null);
  };

  const {
    data: mangaList,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["manga", { pageNumber, pageSize }],
    queryFn: fetchPagedMangas,
  });

  const mutation = useMutation({
    mutationFn: postManga,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manga"] });
    },
    onError: () => {},
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: IUpdateMangaData }) =>
      updateManga(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manga"] });
    },
    onError: () => {},
  });

  const handleOpenModal = (item: IRow | IMangaResponse | null = null) => {
    setMessage(null);

    if (item === null) {
      setNewItem(item);
    } else {
      const newItem = {
        id: Number(item["id"]),
        coverUrl: String(item["coverUrl"]),
        aniListId: Number(item["aniListId"]),
        myAnimeListId: Number(item["myAnimeListId"]),
        titleEnglish: String(item["titleEnglish"]),
        titleRomaji: String(item["titleRomaji"]),
      };

      setNewItem(newItem);
    }

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewItem(null);
  };

  const handleAddNewItem = async (item: IRow) => {
    const mangaData: ICreateMangaData | IUpdateMangaData = {
      coverUrl: String(item.coverUrl),
      aniListId: Number(item.aniListId),
      myAnimeListId: Number(item.myAnimeListId),
      titleEnglish: String(item.titleEnglish),
      titleRomaji: String(item.titleRomaji),
    };

    const isEditing = !!item.id;

    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: item.id!, data: mangaData });
        setMessage({ type: "success", text: "Manga updated successfully!" });
      } else {
        await mutation.mutateAsync(mangaData);
        setMessage({ type: "success", text: "Manga created successfully!" });

        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      }
    } catch {
      setMessage({
        type: "error",
        text: isEditing
          ? "Failed to update manga. Please try again."
          : "Failed to create manga. Please try again.",
      });
    }
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
        <Typography color="error">Failed to load mangas.</Typography>
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
          Add New Manga
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mangaList?.items.map((manga) => (
              <TableRow key={manga.id}>
                <TableCell>{manga.id}</TableCell>
                <TableCell>{manga.titleEnglish}</TableCell>
                <TableCell>
                  {new Date(manga.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell
                  sx={{
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenModal(manga)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleOpenDeleteDialog(manga)}
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
          count={mangaList?.totalPages || 0}
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
            Are you sure you want to delete{" "}
            <strong>{selectedMangaToDelete?.titleEnglish}</strong>? This action
            cannot be undone.
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
