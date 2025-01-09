import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchUserData } from "../api/queries/Queries";
import { IUserData } from "../interfaces/interfaces";

const Home: React.FC = () => {
  const [data, setData] = useState<IUserData[] | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const {
    data: userDataList,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userData", userName],
    queryFn: () => fetchUserData(userName!),
    enabled: !!userName,
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

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
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
          >
            <Card
              sx={{
                borderWidth: "1px",
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
                  padding: "0.5rem 1rem !important",
                }}
              >
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {userData.titleEnglish || userData.titleRomaji}
                </Typography>

                <div>
                  <Typography variant="body2" color={"success"}>
                    <strong>
                      Source: {userData.sourceLastChapterNumber ?? "N/A"}
                    </strong>
                  </Typography>
                  <Typography
                    variant="body2"
                    color={
                      userData.sourceLastChapterNumber ===
                      userData.userLastChapterNumber
                        ? "success"
                        : "warning"
                    }
                  >
                    <strong>User: {userData.userLastChapterNumber}</strong>
                  </Typography>

                  <Typography
                    variant="body2"
                    color={
                      userData.sourceLastChapterNumber
                        ? "primary"
                        : "textSecondary"
                    }
                    sx={{ fontWeight: "bold", mt: 1 }}
                  >
                    Update:{" "}
                    {userData.sourceLastChapterDate
                      ? new Date(
                          userData.sourceLastChapterDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </Typography>

                  <CardActions
                    sx={{
                      display: "flex",
                      gap: "0.5rem",
                      padding: "0 !important",
                    }}
                  >
                    {userData.urlMyAnimeList && (
                      <Button
                        href={userData.urlMyAnimeList}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          height: 25,
                          margin: "0 !important",
                          padding: "0 !important",
                          width: "100%",
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
                    )}
                    {userData.urlAnilist && (
                      <Button
                        href={userData.urlAnilist}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          height: 25,
                          margin: "0 !important",
                          padding: "0 !important",
                          width: "100%",
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
                    )}
                  </CardActions>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default Home;
