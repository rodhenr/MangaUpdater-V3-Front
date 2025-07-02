import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ScheduleIcon from "@mui/icons-material/Schedule";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Card,
  CardMedia,
  Chip,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { IUserMangaData } from "../../../api/user/user.types";
import { parseStringToNumber } from "../../../utils/Utils";
import { getDaysAgo } from "../home.helpers";

type Props = {
  data: IUserMangaData;
  onClick: (id: number) => void;
};

export const UserDataCard = ({ data, onClick }: Props) => {
  const total = parseStringToNumber(data.sourceLastChapterNumber) ?? 0;
  const current = data.userLastChapterNumber;
  const greaterThan = current > total;
  const isCompleted = total === current;

  return (
    <Grid
      size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
      sx={{
        opacity: data.sourceLastChapterDate ? 1 : 0.6,
        filter: data.sourceLastChapterDate ? "none" : "grayscale(100%)",
        "&:hover": {
          cursor: "pointer",
          opacity: 0.75,
        },
      }}
      onClick={() => onClick(data.myAnimeListId ?? 0)}
    >
      <Card
        sx={{
          backgroundColor: "transparent",
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
        <Box sx={{ position: "relative", height: 350 }}>
          <CardMedia
            component="img"
            src={data.coverUrl}
            loading="lazy"
            onLoad={(e) => (e.currentTarget.style.filter = "none")}
            sx={{
              width: "100%",
              height: "100%",
              filter: "blur(8px)",
              transition: "filter 0.3s ease-out",
              objectFit: "cover",
            }}
          />

          {data.sourceLastChapterDate && (
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backdropFilter: "blur(4px)",
                backgroundColor: "rgba(0, 0, 0, 0.65)",
                color: isCompleted
                  ? "#00e676"
                  : greaterThan
                  ? "#EEAD2D"
                  : "#ff5252",
                padding: "4px 8px",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "0.95rem",
                boxShadow: "0 0 6px rgba(0, 0, 0, 0.7)",
                border: "1px solid rgba(255,255,255,0.1)",
                zIndex: 3,
              }}
            >
              {current}/{data.sourceLastChapterNumber ?? "N/A"}
            </Box>
          )}

          <Box
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
              ":hover": {
                opacity: 1,
              },
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
              {data.score}
            </Box>

            <Box sx={{ marginTop: "2rem" }}>
              <Tooltip title={data.titleEnglish || data.titleRomaji}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", fontSize: "0.95rem", mb: "0.3rem" }}
                  noWrap
                >
                  {data.titleEnglish || data.titleRomaji}
                </Typography>
              </Tooltip>

              {data.sourceLastChapterDate && (
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
                  Last update: {getDaysAgo(data.sourceLastChapterDate)}
                </Typography>
              )}
            </Box>

            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
            >
              <Chip
                size="small"
                sx={{
                  backgroundColor:
                    data.status === "FINISHED"
                      ? "rgba(0, 230, 118, 0.5)"
                      : data.status === "RELEASING"
                      ? "rgba(41, 121, 255, 0.5)"
                      : data.status === "NOT_YET_RELEASED"
                      ? "rgba(255, 179, 0, 0.5)"
                      : data.status === "CANCELLED"
                      ? "rgba(244, 67, 54, 0.5)"
                      : data.status === "HIATUS"
                      ? "rgba(255, 152, 0, 0.5)"
                      : "rgba(255, 255, 255, 0.5)",
                  color: "#fff",
                  height: 20,
                  fontSize: "0.65rem",
                  padding: "0 6px",
                  borderRadius: "4px",
                }}
                label={
                  <>
                    {data.status === "FINISHED" && (
                      <CheckCircleIcon sx={{ fontSize: 14 }} />
                    )}
                    {data.status === "RELEASING" && (
                      <RocketLaunchIcon sx={{ fontSize: 14 }} />
                    )}
                    {data.status === "NOT_YET_RELEASED" && (
                      <ScheduleIcon sx={{ fontSize: 14 }} />
                    )}
                    {data.status === "CANCELLED" && (
                      <CancelIcon sx={{ fontSize: 14 }} />
                    )}
                    {data.status === "HIATUS" && (
                      <PauseCircleIcon sx={{ fontSize: 14 }} />
                    )}
                    {{
                      FINISHED: "Finished",
                      RELEASING: "Releasing",
                      NOT_YET_RELEASED: "Not Yet Released",
                      CANCELLED: "Cancelled",
                      HIATUS: "Hiatus",
                    }[data.status] || data.status}
                  </>
                }
              />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                {data.genres.map((genre) => (
                  <Chip
                    key={genre}
                    label={genre}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.15)",
                      color: "#fff",
                      height: 20,
                      fontSize: "0.65rem",
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
};
