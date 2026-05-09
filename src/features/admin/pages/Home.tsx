import { Box, CircularProgress, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import {
  adminDataSurfaceSx,
  adminPageHeroSx,
  adminPageShellSx,
  adminPageTitleSx,
} from "../admin.helpers";
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
      <Stack alignItems="center" mt={4}>
        <CircularProgress />
      </Stack>
    );

  return (
    <Box sx={adminPageShellSx}>
      <Paper elevation={0} sx={adminPageHeroSx}>
        <Typography sx={adminPageTitleSx}>
          Overview
        </Typography>
      </Paper>

      <MetricsGrid data={metricsData} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }} sx={{ display: "flex" }}>
          <Paper
            elevation={0}
            sx={{
              ...adminDataSurfaceSx,
              p: 3,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: 320,
            }}
          >
            <Typography variant="h6" mb={2} color="white" sx={{ fontWeight: 700 }}>
              Manga per Source
            </Typography>
            <Box sx={{ flex: 1, minHeight: 240 }}>
              <MangaSourcePieChart data={mangaSourceDistribution} />
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }} sx={{ display: "flex" }}>
          <Paper
            elevation={0}
            sx={{
              ...adminDataSurfaceSx,
              p: 3,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: 320,
            }}
          >
            <Typography variant="h6" mb={2} color="white" sx={{ fontWeight: 700 }}>
              Latest Logs
            </Typography>
            <Box
              sx={{
                maxHeight: 240,
                overflowY: "auto",
                pr: 0.5,
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(93, 173, 226, 0.55) rgba(255, 255, 255, 0.04)",
                "&::-webkit-scrollbar": {
                  width: 10,
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderRadius: 999,
                },
                "&::-webkit-scrollbar-thumb": {
                  background:
                    "linear-gradient(180deg, rgba(93, 173, 226, 0.8) 0%, rgba(46, 134, 222, 0.7) 100%)",
                  borderRadius: 999,
                  border: "2px solid rgba(15, 23, 33, 0.9)",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background:
                    "linear-gradient(180deg, rgba(118, 188, 237, 0.9) 0%, rgba(59, 151, 235, 0.85) 100%)",
                },
              }}
            >
              <LogsPanel logs={logsData.items} />
            </Box>
          </Paper>
        </Grid>

        <Grid
          container
          spacing={3}
          size={{ xs: 12, md: 12 }}
          sx={{ display: "flex", gap: 3 }}
        >
          <Grid size={{ xs: 12, xl: 6 }}>
            <MangaTable mangas={mangasData.items} />
          </Grid>
          <Grid size={{ xs: 12, xl: 6 }}>
            <ChapterTable chapters={chaptersData.items} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
