// components/MangaModal.tsx
import {
  Box,
  Button,
  CardMedia,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { fetchMangaById } from "../../api/queries/Queries";
import { IMangaData } from "../../interfaces/interfaces";

interface MangaModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

const MangaModal: React.FC<MangaModalProps> = ({ open, onClose, id }) => {
  const [data, setData] = useState<IMangaData | null>(null);

  const {
    data: mangaData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["mangaData", id],
    queryFn: () => fetchMangaById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (!mangaData) return;

    setData(mangaData);
  }, [mangaData]);

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;
  if (data === null) return <p>No data found</p>;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: "#3c3c3c",
          borderRadius: 2,
          boxShadow: 24,
          color: "#fff",
          left: "50%",
          maxWidth: 800,
          p: 3,
          position: "absolute",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
        }}
      >
        <Stack direction="row" spacing={2}>
          <CardMedia
            component="img"
            image={data.coverUrl}
            sx={{
              width: 150,
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <Box>
              <Typography gutterBottom sx={{ fontSize: "1.5rem", flex: 1 }}>
                {data.titleEnglish}
              </Typography>
              <Typography gutterBottom sx={{ fontSize: "0.8rem", flex: 1 }}>
                {data.titleRomaji}
              </Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Button
                href={`https://myanimelist.net/manga/${mangaData?.myAnimeListId}`}
                target="_blank"
                rel="noopener noreferrer"
                disabled={mangaData?.myAnimeListId === null}
                sx={{
                  height: 25,
                  margin: "0 !important",
                  padding: "0 !important",
                  width: 75,
                }}
              >
                <Box
                  component="img"
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/7/7a/MyAnimeList_Logo.png"
                  }
                  alt={"MyAnimeList"}
                  sx={{
                    height: "100%",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              </Button>
              <Button
                href={`https://anilist.co/manga/${mangaData?.aniListId}`}
                target="_blank"
                rel="noopener noreferrer"
                disabled={mangaData?.aniListId === null}
                sx={{
                  height: 25,
                  margin: "0 !important",
                  padding: "0 !important",
                  width: 75,
                }}
              >
                <Box
                  component="img"
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/6/61/AniList_logo.svg"
                  }
                  alt={"Anilist"}
                  sx={{
                    height: "100%",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              </Button>
            </Box>
          </Box>
        </Stack>

        <TableContainer sx={{ maxHeight: 350, mt: 2, overflowY: "auto" }}>
          <Table stickyHeader>
            <TableHead sx={{ bgcolor: "#000" }}>
              <TableRow>
                <TableCell sx={{ bgcolor: "#000", color: "#fff" }}>
                  Chapter
                </TableCell>
                <TableCell sx={{ bgcolor: "#000", color: "#fff" }}>
                  Date
                </TableCell>
                <TableCell sx={{ bgcolor: "#000", color: "#fff" }}>
                  Link
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ bgcolor: "#646464" }}>
              {data.chapters
                .slice()
                .sort((a, b) => b.number - a.number)
                .map((chapter, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: "#fff" }}>
                      Chapter {chapter.number}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      {chapter.date
                        ? format(new Date(chapter.date), "yyyy-MM-dd HH:mm")
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <a
                        href={chapter.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#90caf9" }}
                      >
                        Read
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

export default MangaModal;
