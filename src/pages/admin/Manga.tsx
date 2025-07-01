import {
  Box,
  Button,
  CircularProgress,
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
import { postManga } from "../../api/commands/Commands";
import { fetchMangas, updateMangaData } from "../../api/queries/Queries";
import Modal from "../../components/modal/Modal";
import {
  IManga,
  IMangaPost,
  IMangaUpdate,
  IModalMessage,
  IRow,
} from "../../interfaces/interfaces";

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

export default function MangaPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 12;
  const [openModal, setOpenModal] = useState(false);
  const [newItem, setNewItem] = useState<IRow | null>(null);
  const queryClient = useQueryClient();
  const [message, setMessage] = useState<IModalMessage | null>(null);

  const {
    data: mangaList,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["manga", { pageNumber, pageSize }],
    queryFn: fetchMangas,
  });

  const mutation = useMutation({
    mutationFn: postManga,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manga"] });
    },
    onError: () => {},
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: IMangaUpdate }) =>
      updateMangaData(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manga"] });
    },
    onError: () => {},
  });

  const handleOpenModal = (item: IRow | IManga | null = null) => {
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
    const mangaData: IMangaPost | IMangaUpdate = {
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
    <Box p={4}>
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
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenModal(manga)}
                  >
                    Edit
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
    </Box>
  );
}
