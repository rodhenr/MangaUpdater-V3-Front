import { Error as ErrorIcon, Info as InfoIcon } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  fetchLogs,
  fetchMangas,
  fetchMetrics,
  fetchSourceDistribution,
} from "../../api/queries/Queries";
import {
  IManga,
  IMetric,
  ISourceDistribution,
} from "../../interfaces/interfaces";

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

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA66CC",
  "#FF6699",
];

const MangaSourcePieChart: React.FC<{
  data: ISourceDistribution[];
}> = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        dataKey="mangaCount"
        nameKey="sourceName"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label={false}
        labelLine={false}
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value: number) => `${value} mangas`} />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

const mangaColumns: GridColDef<IManga>[] = [
  {
    field: "titleEnglish",
    headerName: "Title",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Added Date",
    minWidth: 150,
    renderCell: (params: GridRenderCellParams<IManga>) => {
      const createdAt = params.row.createdAt;

      if (!createdAt) return "-";

      const date = new Date(createdAt);

      if (isNaN(date.getTime())) return "-";

      return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  {
    field: "links",
    headerName: "Links",
    sortable: false,
    filterable: false,
    minWidth: 130,
    renderCell: (params: GridRenderCellParams<IManga, unknown>) => {
      const { myAnimeListId, aniListId } = params.row;

      return (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ height: "100%", width: "100%" }}
        >
          <IconButton
            size="small"
            href={`https://myanimelist.net/manga/${myAnimeListId}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontSize: "0.75rem",
              color: "#90caf9",
              border: "1px solid #90caf9",
              p: "2px 2px",
              borderRadius: "4px",
              height: 30,
              width: 50,
            }}
          >
            MAL
          </IconButton>
          <IconButton
            size="small"
            href={`https://anilist.co/manga/${aniListId}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontSize: "0.75rem",
              color: "#f48fb1",
              border: "1px solid #f48fb1",
              p: "2px 2px",
              borderRadius: "4px",
              height: 30,
              width: 50,
            }}
          >
            AL
          </IconButton>
        </Stack>
      );
    },
  },
];

const DashboardHome: React.FC = () => {
  const { data: metricsData, isLoading: isMetricsLoading } = useQuery({
    queryKey: ["metrics"],
    queryFn: fetchMetrics,
  });

  const { data: logsData, isLoading: isLogsLoading } = useQuery({
    queryKey: ["logs", { pageNumber: 1, pageSize: 8 }],
    queryFn: fetchLogs,
    select: (result) => ({
      ...result,
      items: result.items.map((log) => ({
        ...log,
        timestamp: new Date(log.timestamp).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      })),
    }),
  });

  const { data: mangasData, isLoading: isMangasLoading } = useQuery({
    queryKey: ["mangas", { pageNumber: 1, pageSize: 5 }],
    queryFn: fetchMangas,
  });

  const {
    data: mangaSourceDistribution,
    isLoading: isMangaSourceDistributionLoading,
  } = useQuery({
    queryKey: ["mangaSourceDistribution"],
    queryFn: fetchSourceDistribution,
  });

  if (
    isMetricsLoading ||
    isLogsLoading ||
    isMangasLoading ||
    isMangaSourceDistributionLoading ||
    logsData === undefined ||
    metricsData === undefined ||
    mangasData === undefined ||
    mangaSourceDistribution === undefined
  )
    return <></>;

  return (
    <>
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
                  {metricsData[stat.key as keyof IMetric]}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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
              {logsData.items.map((log) => (
                <Box key={log.id} display="flex" alignItems="center" mb={1.5}>
                  {log.level === 2 && <InfoIcon color="info" sx={{ mr: 1 }} />}
                  {log.level === 4 && (
                    <ErrorIcon color="error" sx={{ mr: 1 }} />
                  )}
                  <Typography variant="body2" color="white">
                    [{log.timestamp}] {log.message} (
                    {log.module.replace(/^"(.*)"$/, "$1")})
                  </Typography>
                </Box>
              ))}
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

        <Grid size={{ xs: 12 }}>
          <Paper
            sx={{
              bgcolor: "#2A2E3E",
              p: 3,
              borderRadius: 4,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" mb={2} color="white">
              Latest Mangas
            </Typography>
            <DataGrid
              rows={mangasData.items}
              columns={mangaColumns}
              hideFooter
              disableRowSelectionOnClick
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardHome;
