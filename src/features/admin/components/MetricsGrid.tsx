import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { IMetricsResponse } from "../../../api/dashboard/dashboard.types";
import { adminDataSurfaceSx } from "../admin.helpers";

const stats = [
  { label: "Mangas", key: "mangasCount" as const, tone: "#8ad1ff" },
  { label: "Sources", key: "sourcesCount" as const, tone: "#c4a7ff" },
  { label: "Relations", key: "relationsCount" as const, tone: "#80f2c9" },
  { label: "Logs (24h)", key: "logsLastDayCount" as const, tone: "#ffd37d" },
  { label: "Queue", key: "queueCount" as const, tone: "#ff9d9d" },
];

interface MetricsGridProps {
  data: IMetricsResponse;
}

const getMetricValue = (data: IMetricsResponse, key: (typeof stats)[number]["key"]) => {
  if (key === "relationsCount") {
    return data.relationsCount ?? data.RelationsCount ?? 0;
  }

  return data[key] ?? 0;
};

export const MetricsGrid: React.FC<MetricsGridProps> = ({ data }) => {
  return (
    <Grid container spacing={2.25}>
      {stats.map((stat, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} sx={{ display: "flex" }}>
          <Paper
            elevation={0}
            sx={{
              ...adminDataSurfaceSx,
              p: 2.25,
              minHeight: 132,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background:
                "linear-gradient(180deg, rgba(15, 23, 33, 0.92) 0%, rgba(10, 16, 24, 0.88) 100%)",
            }}
          >
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ color: "rgba(226, 232, 240, 0.66)" }}>
                {stat.label}
              </Typography>
              <Typography variant="h4" fontWeight={700} color="white">
                {getMetricValue(data, stat.key)}
              </Typography>
              <Box sx={{ width: 42, height: 4, borderRadius: 999, backgroundColor: stat.tone }} />
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
