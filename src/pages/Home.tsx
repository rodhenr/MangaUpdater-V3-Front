import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ScheduleIcon from "@mui/icons-material/Schedule";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  InputBase,
  Tooltip,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import { fetchUserData } from "../api/queries/Queries";
import MangaModal from "../components/mangaModal/MangaModal";
import { IUserData } from "../interfaces/interfaces";
import { parseStringToNumber } from "../utils/Utils";

const Home: React.FC = () => {
  const [data, setData] = useState<IUserData[] | null>(null);
  const [username, setUsername] = useLocalStorage<string | null>(
    "username",
    null
  );
  const [inputValue, setInputValue] = useState(username ?? "");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: userDataList,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userData", username],
    queryFn: () => fetchUserData(username!),
    enabled: !!username,
  });

  useEffect(() => {
    if (!userDataList) return;

    const sortedData = [...userDataList].sort((a, b) => {
      if (!a.sourceLastChapterDate) return 1;
      if (!b.sourceLastChapterDate) return -1;

      return (
        new Date(b.sourceLastChapterDate).getTime() -
        new Date(a.sourceLastChapterDate).getTime()
      );
    });

    setData(sortedData);
  }, [userDataList]);

  const handleCardClick = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedId(null);
    setIsModalOpen(false);
  };

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    if (trimmed) setUsername(trimmed);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const getDaysAgo = (dateInput: string | Date): string => {
    const inputDate = new Date(dateInput);
    const currentDate = new Date();

    inputDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    const diffInMs = currentDate.getTime() - inputDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "today";
    if (diffInDays === 1) return "yesterday";

    return `${diffInDays} days ago`;
  };

  if (error instanceof Error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1}
        mb={4}
        px={2}
      >
        <InputBase
          placeholder="your anilist username"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          sx={{
            width: {
              xs: "100%",
              sm: 300,
              md: 350,
              lg: 400,
            },
            height: 44,
            px: 1.5,
            borderRadius: "10px",
            fontSize: "0.9rem",
            color: "#eceff1",
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "rgba(255, 255, 255, 0.2)",
            },
            "&:focus-within": {
              borderColor: "#26c6da",
              boxShadow: "0 0 0 2px rgba(38, 198, 218, 0.25)",
            },
            "& input::placeholder": {
              color: "#90a4ae",
              opacity: 1,
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            minWidth: 80,
            height: 44,
            px: 2,
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "0.9rem",
            textTransform: "none",
            color: "#90a4ae",
            backgroundColor: "transparent",
            border: "1.5px solid #90a4ae",
            transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
            "&:hover": {
              backgroundColor: "#90a4ae",
              color: "#212121",
              borderColor: "#90a4ae",
            },
          }}
        >
          Search
        </Button>
      </Box>
      <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
        {isLoading ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 200,
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        ) : data && data.length > 0 ? (
          data.map((userData) => {
            const total = parseStringToNumber(userData.sourceLastChapterNumber);
            const current = userData.userLastChapterNumber;
            const isCompleted = total === current;

            return (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                key={userData.anilistId}
                sx={{
                  opacity: userData.sourceLastChapterDate ? 1 : 0.6,
                  filter: userData.sourceLastChapterDate
                    ? "none"
                    : "grayscale(100%)",
                  "&:hover": {
                    cursor: "pointer",
                    opacity: 0.75,
                  },
                }}
                onClick={() => handleCardClick(userData.myAnimeListId ?? 0)}
              >
                <Card
                  sx={{
                    backgroundColor: "transparent !important",
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                    boxShadow: 3,
                    transition: "transform 0.3s",
                    ":hover": { transform: "scale(1.02)" },
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 350,
                      overflow: "hidden",
                      "&:hover .overlay": { opacity: 1 },
                      "&:hover .progress-badge": { display: "none" },
                    }}
                  >
                    <CardMedia
                      component="img"
                      src={userData.coverUrl}
                      loading="lazy"
                      onLoad={(e) => (e.currentTarget.style.filter = "none")}
                      style={{
                        width: "100%",
                        height: "100%",
                        filter: "blur(8px)",
                        transition: "filter 0.3s ease-out",
                        objectFit: "cover",
                      }}
                    />

                    {userData.sourceLastChapterDate && (
                      <Box
                        className="progress-badge"
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          backdropFilter: "blur(4px)",
                          backgroundColor: "rgba(0, 0, 0, 0.65)",
                          color: isCompleted ? "#00e676" : "#ff5252",
                          padding: "4px 8px",
                          borderRadius: "8px",
                          fontWeight: "bold",
                          fontSize: "0.95rem",
                          boxShadow: "0 0 6px rgba(0, 0, 0, 0.7)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          zIndex: 3,
                        }}
                      >
                        {current}/{userData.sourceLastChapterNumber ?? "N/A"}
                      </Box>
                    )}

                    <Box
                      className="overlay"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1))",
                        backdropFilter: "blur(8px)",
                        color: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        padding: "1.5rem 1rem",
                        boxSizing: "border-box",
                        zIndex: 1,
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          backgroundColor: "rgba(0, 0, 0, 0.65)",
                          padding: "4px 8px",
                          borderRadius: "8px",
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                          border: "1px solid rgba(255,255,255,0.1)",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          zIndex: 2,
                        }}
                      >
                        <StarIcon fontSize="small" />
                        {userData.score}
                      </Box>

                      <Box sx={{ marginTop: "2rem" }}>
                        <Tooltip
                          title={userData.titleEnglish || userData.titleRomaji}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "bold",
                              fontSize: "0.95rem",
                              marginBottom: "0.3rem",
                            }}
                            noWrap
                          >
                            {userData.titleEnglish || userData.titleRomaji}
                          </Typography>
                        </Tooltip>

                        {userData.sourceLastChapterDate && (
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "0.75rem",
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <AccessTimeIcon sx={{ fontSize: "1rem" }} />
                            Last update:{" "}
                            {getDaysAgo(userData.sourceLastChapterDate)}
                          </Typography>
                        )}
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem",
                        }}
                      >
                        <Chip
                          size="small"
                          sx={{
                            backgroundColor:
                              userData.status === "FINISHED"
                                ? "rgba(0, 230, 118, 0.5)"
                                : userData.status === "RELEASING"
                                ? "rgba(41, 121, 255, 0.5)"
                                : userData.status === "NOT_YET_RELEASED"
                                ? "rgba(255, 179, 0, 0.5)"
                                : userData.status === "CANCELLED"
                                ? "rgba(244, 67, 54, 0.5)"
                                : userData.status === "HIATUS"
                                ? "rgba(255, 152, 0, 0.5)"
                                : "rgba(255, 255, 255, 0.5)",
                            color: "#fff",
                            height: 20,
                            fontSize: "0.65rem",
                            padding: "0 6px",
                            borderRadius: "4px",
                            ".MuiChip-label": {
                              padding: 0,
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            },
                          }}
                          label={
                            <>
                              {userData.status === "FINISHED" && (
                                <CheckCircleIcon sx={{ fontSize: 14 }} />
                              )}
                              {userData.status === "RELEASING" && (
                                <RocketLaunchIcon sx={{ fontSize: 14 }} />
                              )}
                              {userData.status === "NOT_YET_RELEASED" && (
                                <ScheduleIcon sx={{ fontSize: 14 }} />
                              )}
                              {userData.status === "CANCELLED" && (
                                <CancelIcon sx={{ fontSize: 14 }} />
                              )}
                              {userData.status === "HIATUS" && (
                                <PauseCircleIcon sx={{ fontSize: 14 }} />
                              )}
                              {{
                                FINISHED: "Finished",
                                RELEASING: "Releasing",
                                NOT_YET_RELEASED: "Not Yet Released",
                                CANCELLED: "Cancelled",
                                HIATUS: "Hiatus",
                              }[userData.status] || userData.status}
                            </>
                          }
                        />

                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.25rem",
                          }}
                        >
                          {userData.genres.map((genre) => (
                            <Chip
                              label={genre}
                              size="small"
                              sx={{
                                backgroundColor: "rgba(255,255,255,0.15)",
                                color: "#fff",
                                height: 20,
                                fontSize: "0.65rem",
                                padding: "0 6px",
                                borderRadius: "4px",
                                ".MuiChip-label": {
                                  padding: 0,
                                },
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Typography sx={{ width: "100%", textAlign: "center", mt: 4 }}>
            No data found.
          </Typography>
        )}
      </Grid>
      {isModalOpen && selectedId !== null && (
        <MangaModal
          open={isModalOpen}
          onClose={handleCloseModal}
          id={selectedId}
        />
      )}
    </>
  );
};

export default Home;
