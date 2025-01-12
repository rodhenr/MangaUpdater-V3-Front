import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import { fetchUserData } from "../api/queries/Queries";
import MangaModal from "../components/mangaModal/MangaModal";
import { IUserData } from "../interfaces/interfaces";

const Home: React.FC = () => {
  const [data, setData] = useState<IUserData[] | null>(null);
  const [username] = useLocalStorage<string | null>("username", null);
  const [selectedId, setSelectedId] = useState<number>(0);
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
    setSelectedId(0);
    setIsModalOpen(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Grid container spacing={1} sx={{ marginBottom: "2rem" }}>
        {data &&
          data.map((userData) => (
            <Grid
              size={2.4}
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
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor:
                    userData.sourceLastChapterNumber === null
                      ? "gray"
                      : userData.sourceLastChapterNumber ===
                        userData.userLastChapterNumber
                      ? "#2e7d32"
                      : "#ed6c02",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  image={userData.coverUrl}
                  sx={{
                    width: "100%",
                    height: 200,
                  }}
                />
                <CardContent
                  sx={{
                    bgcolor: "#000",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    gap: "0.75rem",
                    justifyContent: "space-between",
                    height: 100,
                    padding: "0.5rem 1rem !important",
                  }}
                >
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {userData.titleEnglish || userData.titleRomaji}
                  </Typography>

                  <Box
                    component="div"
                    sx={{
                      alignItems: "flex-end",
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color={
                        userData.sourceLastChapterNumber ===
                        userData.userLastChapterNumber
                          ? "success"
                          : "warning"
                      }
                      sx={{ fontWeight: "bold" }}
                    >
                      Progress: {userData.userLastChapterNumber} of{" "}
                      {userData.sourceLastChapterNumber ?? "N/A"}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <MangaModal
        open={isModalOpen}
        onClose={handleCloseModal}
        id={selectedId}
      />
    </>
  );
};

export default Home;
