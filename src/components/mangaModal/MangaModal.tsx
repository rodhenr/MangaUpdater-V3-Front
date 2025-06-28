import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Grid,
  Link,
  Modal,
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
import React from "react";
import { fetchMangaById } from "../../api/queries/Queries";
import { parseStringToNumber } from "../../utils/Utils";

interface MangaModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

const MangaModal: React.FC<MangaModalProps> = ({ open, onClose, id }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["mangaData", id],
    queryFn: () => fetchMangaById(id),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <Modal
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: { sx: { backgroundColor: "rgba(0,0,0,0.85)" } },
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1300,
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      </Modal>
    );

  if (error instanceof Error)
    return (
      <Modal
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: { sx: { backgroundColor: "rgba(0,0,0,0.85)" } },
        }}
      >
        <Box
          sx={{
            bgcolor: "#22252f",
            borderRadius: 2,
            boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
            color: "#eee",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 600 },
            p: 4,
            textAlign: "center",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Error: {error.message}
          </Typography>
        </Box>
      </Modal>
    );

  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{ backdrop: { sx: { backgroundColor: "rgba(0,0,0,0.85)" } } }}
    >
      <Box
        sx={{
          bgcolor: "#22252f",
          borderRadius: 2,
          boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
          color: "#eee",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", sm: 800 },
          maxHeight: "90vh",
          overflowY: "auto",
          p: 4,
          outline: "none",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        {!data ? (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: 2,
              px: 2,
            }}
          >
            <Typography variant="h5" fontWeight={600} color="#ccc">
              Oops! Looks like this manga is taking a little break...
            </Typography>
            <Typography variant="body2" color="#999" maxWidth={480}>
              We don’t have any info about it here yet. But don’t worry, we’re
              always hunting down new titles! Try another one or check back
              later.
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              <Grid>
                <CardMedia
                  component="img"
                  image={data.coverUrl}
                  alt={data.titleEnglish}
                  sx={{
                    width: 160,
                    height: 240,
                    borderRadius: 2,
                    objectFit: "cover",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.8)",
                  }}
                />
              </Grid>

              <Grid>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight={700}
                      sx={{ color: "#fff", mb: 0.5 }}
                      noWrap
                      title={data.titleEnglish}
                    >
                      {data.titleEnglish}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "#aaa", fontStyle: "italic" }}
                      noWrap
                      title={data.titleRomaji}
                    >
                      {data.titleRomaji}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                    <Button
                      href={`https://myanimelist.net/manga/${data?.myAnimeListId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      disabled={!data?.myAnimeListId}
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: "#3f51b5",
                        color: "#3f51b5",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "rgba(63,81,181,0.1)",
                          borderColor: "#3f51b5",
                        },
                      }}
                    >
                      MAL
                    </Button>

                    <Button
                      href={`https://anilist.co/manga/${data?.aniListId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      disabled={!data?.aniListId}
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: "#00acc1",
                        color: "#00acc1",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "rgba(0,172,193,0.1)",
                          borderColor: "#00acc1",
                        },
                      }}
                    >
                      AniList
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <TableContainer
              sx={{
                mt: 3,
                maxHeight: 360,
                borderRadius: 1,
                overflowY: "auto",
                backgroundColor: "#2e303e",
                "&::-webkit-scrollbar": {
                  width: 6,
                  backgroundColor: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#90caf9",
                  borderRadius: 3,
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#42a5f5",
                },
                scrollbarWidth: "thin",
                scrollbarColor: "#90caf9 transparent",
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {["Chapter", "Date", "Link"].map((headCell) => (
                      <TableCell
                        key={headCell}
                        sx={{
                          backgroundColor: "#3b3f58",
                          color: "#bbdefb",
                          fontWeight: "bold",
                          fontSize: "0.95rem",
                          position: "sticky",
                          top: 0,
                          zIndex: 1,
                        }}
                      >
                        {headCell}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody sx={{ backgroundColor: "#2e303e" }}>
                  {data.chapters
                    .slice()
                    .sort((a, b) => {
                      const numA = parseStringToNumber(a.number);
                      const numB = parseStringToNumber(b.number);

                      if (numA !== null && numB !== null) {
                        return numB - numA;
                      }

                      return numA === null ? 1 : -1;
                    })
                    .map((chapter, index) => (
                      <TableRow
                        key={index}
                        hover
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "#546e7a",
                          },
                        }}
                      >
                        <TableCell sx={{ color: "#e0e0e0" }}>
                          Chapter {chapter.number}
                        </TableCell>
                        <TableCell sx={{ color: "#e0e0e0" }}>
                          {chapter.date
                            ? format(new Date(chapter.date), "yyyy-MM-dd HH:mm")
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <Link
                            href={chapter.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                            sx={{
                              color: "#90caf9",
                              fontWeight: 600,
                              "&:hover": { color: "#42a5f5" },
                              cursor: "pointer",
                            }}
                          >
                            Read
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default MangaModal;
