import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { IMetricsResponse } from "../../../api/dashboard/dashboard.types";

const stats = [
  { label: "Mangas", value: 243, color: "primary", key: "mangasCount" },
  { label: "Sources", value: 7, color: "secondary", key: "sourcesCount" },
  { label: "Relations", value: 1043, color: "info", key: "relationsCount" },
  {
    label: "Logs (24h)",
    value: 342,
    color: "success",
    key: "logsLastDayCount",
  },
  { label: "Queue", value: 12, color: "warning", key: "queueCount" },
];

interface MetricsGridProps {
  data: IMetricsResponse;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ data }) => {
  return (
    <Grid container spacing={2} mb={4}>
      {stats.map((stat, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <Card
            sx={{
              bgcolor: "#2A2E3E",
              borderRadius: 4,
              boxShadow: 3,
              p: 2,
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <CardContent>
              <Typography variant="body2" color="gray">
                {stat.label}
              </Typography>
              <Typography variant="h5" fontWeight={700} color="white">
                {data[stat.key as keyof IMetricsResponse]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
