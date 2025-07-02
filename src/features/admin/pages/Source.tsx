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
import { postSource } from "../../../api/source/source.commands";
import { fetchPagedSources } from "../../../api/source/source.queries";
import {
  ICreateSourceData,
  IPagedSourceResponse,
} from "../../../api/source/source.types";
import Modal from "../../../components/modal/Modal";
import { IModalMessage, IRow } from "../../../interfaces/interfaces";

const columns = [
  { isAdd: false, isEditable: false, field: "id", headerName: "ID" },
  { isAdd: true, isEditable: true, field: "name", headerName: "Name" },
  { isAdd: true, isEditable: true, field: "baseUrl", headerName: "Base URL" },
];

export const Source = () => {
  const queryClient = useQueryClient();
  const pageSize = 12;

  const [pageNumber, setPageNumber] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [newItem, setNewItem] = useState<IRow | null>(null);
  const [message, setMessage] = useState<IModalMessage | null>(null);

  const {
    data: sourceList,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["sources", { pageNumber, pageSize }],
    queryFn: fetchPagedSources,
  });

  const mutation = useMutation({
    mutationFn: postSource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sources"] });
      setMessage({ type: "success", text: "Source created successfully!" });

      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    },
    onError: () => {
      setMessage({ type: "error", text: "Failed to create source." });
    },
  });

  const handleOpenModal = (item: IRow | IPagedSourceResponse | null = null) => {
    setMessage(null);

    if (item === null) {
      setNewItem(null);
    } else {
      const newItem: IRow = {
        id: item.id,
        name: item.name,
        baseUrl: item.baseUrl,
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
    const source: ICreateSourceData = {
      name: String(item.name),
      baseUrl: String(item.baseUrl),
    };

    try {
      await mutation.mutateAsync(source);
    } catch {
      // handled via onError
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
        <Typography color="error">Failed to load sources.</Typography>
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
          Add New Source
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Base URL</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sourceList?.items.map((source: IPagedSourceResponse) => (
              <TableRow key={source.id}>
                <TableCell>{source.id}</TableCell>
                <TableCell>{source.name}</TableCell>
                <TableCell>{source.baseUrl}</TableCell>
                <TableCell
                  sx={{
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenModal(source)}
                  >
                    Edit
                  </Button>
                  {/* Implementar botão Delete se desejar */}
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
    </Box>
  );
};
