import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { ChapterTable } from "../components/ChapterTable";
import { LogsPanel } from "../components/LogsPanel";
import { MangaSourcePieChart } from "../components/MangaSourcePieChart";
import { MangaTable } from "../components/MangaTable";
import { MetricsGrid } from "../components/MetricsGrid";
import { useHomeData } from "../hooks/useHomeData";

export const Home: React.FC = () => {
  const {
    isMetricsLoading,
    isLogsLoading,
    isMangasLoading,
    isChaptersLoading,
    isMangaSourceDistributionLoading,
    metricsData,
    logsData,
    mangasData,
    chaptersData,
    mangaSourceDistribution,
  } = useHomeData();

  const isLoading =
    isMetricsLoading ||
    isLogsLoading ||
    isMangasLoading ||
    isChaptersLoading ||
    isMangaSourceDistributionLoading ||
    !metricsData ||
    !logsData ||
    !mangasData ||
    !chaptersData ||
    !mangaSourceDistribution;

  if (isLoading)
    return (
      <Box>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <MetricsGrid data={metricsData} />

      <Grid container spacing={3} mb={4}>
        <Grid
          container
          spacing={3}
          size={{ xs: 12, md: 12 }}
          sx={{ display: "flex", gap: 3 }}
        >
          <Grid size={{ xs: 12, md: 6 }} sx={{ flex: 1, display: "flex" }}>
            <Paper
              sx={{
                bgcolor: "#2A2E3E",
                p: 3,
                borderRadius: 4,
                boxShadow: 3,
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" mb={2} color="white">
                Latest Logs
              </Typography>
              <LogsPanel logs={logsData.items} />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ flex: 1, display: "flex" }}>
            <Paper
              sx={{
                bgcolor: "#2A2E3E",
                p: 3,
                borderRadius: 4,
                boxShadow: 3,
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" mb={2} color="white">
                Manga per Source
              </Typography>
              <Box sx={{ flex: 1 }}>
                <MangaSourcePieChart data={mangaSourceDistribution} />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={3}
          size={{ xs: 12, md: 12 }}
          sx={{ display: "flex", gap: 3 }}
        >
          <Grid size={{ xs: 6 }}>
            <MangaTable mangas={mangasData.items} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <ChapterTable chapters={chaptersData.items} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
