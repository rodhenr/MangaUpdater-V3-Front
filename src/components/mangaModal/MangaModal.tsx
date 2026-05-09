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
import { fetchMangaById } from "../../api/manga/manga.queries";
import { parseStringToNumber } from "../../utils/Utils";

interface MangaModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

const MangaModal: React.FC<MangaModalProps> = ({ open, onClose, id }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["mangaData", id],
    queryFn: fetchMangaById(id),
    enabled: !!id,
  });
  const displayTitle = data?.titleEnglish ?? data?.titleRomaji ?? "Manga";

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
          backdrop: { sx: { backgroundColor: "rgba(9, 12, 18, 0.86)", backdropFilter: "blur(6px)" } },
        }}
      >
        <Box
          sx={{
            bgcolor: "rgba(17, 24, 39, 0.96)",
            borderRadius: 4,
            border: "1px solid rgba(148, 163, 184, 0.14)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.36)",
            color: "#e2e8f0",
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
          bgcolor: "rgba(17, 24, 39, 0.96)",
          borderRadius: 4,
          border: "1px solid rgba(148, 163, 184, 0.14)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.36)",
          color: "#e2e8f0",
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
            <Typography variant="body2" color="rgba(226, 232, 240, 0.64)" maxWidth={480}>
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
                  alt={displayTitle}
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
                      title={displayTitle}
                    >
                      {displayTitle}
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
                        borderColor: "rgba(93, 173, 226, 0.26)",
                        color: "#a9ddff",
                        textTransform: "none",
                        fontWeight: 600,
                        backgroundColor: "rgba(93, 173, 226, 0.08)",
                        "&:hover": {
                          backgroundColor: "rgba(93, 173, 226, 0.14)",
                          borderColor: "rgba(93, 173, 226, 0.36)",
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
                        borderColor: "rgba(93, 173, 226, 0.26)",
                        color: "#a9ddff",
                        textTransform: "none",
                        fontWeight: 600,
                        backgroundColor: "rgba(93, 173, 226, 0.08)",
                        "&:hover": {
                          backgroundColor: "rgba(93, 173, 226, 0.14)",
                          borderColor: "rgba(93, 173, 226, 0.36)",
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
                borderRadius: 3,
                overflowY: "auto",
                backgroundColor: "rgba(15, 23, 33, 0.9)",
                border: "1px solid rgba(148, 163, 184, 0.12)",
                "&::-webkit-scrollbar": {
                  width: 8,
                  backgroundColor: "transparent",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderRadius: 999,
                },
                "&::-webkit-scrollbar-thumb": {
                  background:
                    "linear-gradient(180deg, rgba(93, 173, 226, 0.82) 0%, rgba(46, 134, 222, 0.74) 100%)",
                  borderRadius: 999,
                  border: "2px solid rgba(15, 23, 33, 0.9)",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background:
                    "linear-gradient(180deg, rgba(118, 188, 237, 0.9) 0%, rgba(59, 151, 235, 0.84) 100%)",
                },
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(93, 173, 226, 0.72) rgba(255, 255, 255, 0.03)",
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {["Chapter", "Date", "Link"].map((headCell) => (
                      <TableCell
                        key={headCell}
                        sx={{
                          background:
                            "linear-gradient(180deg, rgba(17, 24, 39, 0.98) 0%, rgba(13, 19, 28, 0.94) 100%)",
                          color: "#a9ddff",
                          borderBottom: "1px solid rgba(148, 163, 184, 0.12)",
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

                <TableBody sx={{ backgroundColor: "rgba(15, 23, 33, 0.9)" }}>
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
                          backgroundColor: "transparent",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                          },
                        }}
                      >
                        <TableCell sx={{ color: "#e2e8f0", borderColor: "rgba(148, 163, 184, 0.08)" }}>
                          Chapter {chapter.number}
                        </TableCell>
                        <TableCell sx={{ color: "#e2e8f0", borderColor: "rgba(148, 163, 184, 0.08)" }}>
                          {chapter.date
                            ? format(new Date(chapter.date), "yyyy-MM-dd HH:mm")
                            : "N/A"}
                        </TableCell>
                        <TableCell sx={{ borderColor: "rgba(148, 163, 184, 0.08)" }}>
                          <Link
                            href={chapter.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                            sx={{
                              color: "#a9ddff",
                              fontWeight: 600,
                              "&:hover": { color: "#76bced" },
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
