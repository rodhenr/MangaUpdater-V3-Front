import {
  Alert,
  alpha,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  InputAdornment,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { fetchPagedLogs } from "../../../api/logs/logs.queries";
import { getLogLevelMeta, LogLevelKey } from "../../../api/logs/logs.types";
import { adminPageHeroSx, adminPageTitleSx, sortAdminItems } from "../admin.helpers";

const levelOptions = [
  { value: "all", label: "All levels" },
  { value: "trace", label: "Trace" },
  { value: "debug", label: "Debug" },
  { value: "info", label: "Info" },
  { value: "warning", label: "Warning" },
  { value: "error", label: "Error" },
  { value: "critical", label: "Critical" },
];

const levelTone = {
  trace: {
    label: "Trace",
    borderColor: alpha("#8f9bb3", 0.25),
    backgroundColor: alpha("#8f9bb3", 0.08),
    color: "#c6cedb",
  },
  debug: {
    label: "Debug",
    borderColor: alpha("#9b8cff", 0.34),
    backgroundColor: alpha("#9b8cff", 0.1),
    color: "#d7d1ff",
  },
  info: {
    label: "Info",
    borderColor: alpha("#5dade2", 0.38),
    backgroundColor: alpha("#5dade2", 0.12),
    color: "#a9ddff",
  },
  warning: {
    label: "Warning",
    borderColor: alpha("#f5c451", 0.38),
    backgroundColor: alpha("#f5c451", 0.12),
    color: "#ffe08a",
  },
  error: {
    label: "Error",
    borderColor: alpha("#ff6b6b", 0.38),
    backgroundColor: alpha("#ff6b6b", 0.14),
    color: "#ffb3b3",
  },
  critical: {
    label: "Critical",
    borderColor: alpha("#ff4d8d", 0.4),
    backgroundColor: alpha("#ff4d8d", 0.14),
    color: "#ffb0cf",
  },
  none: {
    label: "None",
    borderColor: alpha("#94a3b8", 0.28),
    backgroundColor: alpha("#94a3b8", 0.08),
    color: "#d7dee8",
  },
  unknown: {
    label: "Unknown",
    borderColor: alpha("#8f9bb3", 0.32),
    backgroundColor: alpha("#8f9bb3", 0.1),
    color: "#d3d8e2",
  },
} as const;

export const Logs: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const pageSize = 20;
  const normalizedQuery = query.trim().toLowerCase();
  const hasActiveFilters = levelFilter !== "all" || normalizedQuery.length > 0;
  const requestPageSize = hasActiveFilters ? 1000 : pageSize;

  const { data, error, isLoading } = useQuery({
    queryKey: ["logs", { pageNumber: hasActiveFilters ? 1 : pageNumber, pageSize: requestPageSize }],
    queryFn: fetchPagedLogs,
    select: (result) => ({
      ...result,
      items: sortAdminItems(
        result.items.map((log) => {
          const timestampDate = new Date(log.timestamp);
          const levelMeta = getLogLevelMeta(log.level);
          return {
            ...log,
            dateDisplay: timestampDate.toLocaleDateString("en-GB"),
            fullTimestamp: timestampDate.toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            levelText: levelMeta.label,
            levelKey: levelMeta.key,
          } as {
            timestamp: string;
            module: string;
            level: number;
            message: string;
            exception?: string | null;
            dateDisplay: string;
            fullTimestamp: string;
            levelText: string;
            levelKey: LogLevelKey;
          };
        })
      ),
    }),
  });

  useEffect(() => {
    setPageNumber(1);
  }, [levelFilter, normalizedQuery]);

  const filteredItems =
    data?.items.filter((log) => {
      const matchesLevel = levelFilter === "all" || log.levelKey === levelFilter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [log.message, log.module, log.exception ?? "", log.fullTimestamp]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesLevel && matchesQuery;
    }) ?? [];

  const pagedItems = hasActiveFilters
    ? filteredItems.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
    : filteredItems;
  const totalPages = hasActiveFilters
    ? Math.max(1, Math.ceil(filteredItems.length / pageSize))
    : data?.totalPages || 0;

  const infoCount = data?.items.filter((log) => log.levelKey === "info").length ?? 0;
  const errorCount =
    data?.items.filter((log) => log.levelKey === "error" || log.levelKey === "critical").length ?? 0;
  const visibleCount = filteredItems.length;

  if (isLoading)
    return (
      <Stack alignItems="center" mt={4}>
        <CircularProgress />
      </Stack>
    );

  if (error instanceof Error)
    return (
      <Stack alignItems="center" mt={4}>
        <Alert severity="error">Error: {error.message}</Alert>
      </Stack>
    );

  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={adminPageHeroSx}
      >
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={2.5}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", lg: "center" }}
          sx={{ width: "100%" }}
        >
          <Box>
            <Typography sx={adminPageTitleSx}>
              System logs
            </Typography>
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{ ml: { lg: "auto" }, alignItems: { xs: "stretch", sm: "center" } }}
          >
            {[
              { label: "Visible", value: visibleCount, tone: "#7dd3fc" },
              { label: "Info", value: infoCount, tone: "#9ff0bf" },
              { label: "Errors", value: errorCount, tone: "#ffb3b3" },
            ].map((item) => (
              <Paper
                key={item.label}
                elevation={0}
                sx={{
                  minWidth: 108,
                  p: 1.1,
                  borderRadius: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(148, 163, 184, 0.14)",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(226, 232, 240, 0.64)", display: "block", lineHeight: 1.1 }}
                >
                  {item.label}
                </Typography>
                <Typography variant="h6" sx={{ color: item.tone, fontWeight: 700, lineHeight: 1.15 }}>
                  {item.value}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 2.5 },
          borderRadius: 4,
          backgroundColor: "rgba(15, 23, 33, 0.86)",
          border: "1px solid rgba(148, 163, 184, 0.12)",
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            fullWidth
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by message, module, exception or date"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "rgba(226, 232, 240, 0.56)" }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: "rgba(255, 255, 255, 0.03)",
              },
            }}
          />

          <FormControl sx={{ minWidth: { xs: "100%", md: 180 } }}>
            <Select
              value={levelFilter}
              onChange={(event) => setLevelFilter(event.target.value)}
              displayEmpty
              sx={{
                borderRadius: 3,
                backgroundColor: "rgba(255, 255, 255, 0.03)",
              }}
            >
              {levelOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      <Stack spacing={1.5}>
        {filteredItems.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 4,
              backgroundColor: "rgba(15, 23, 33, 0.8)",
              border: "1px dashed rgba(148, 163, 184, 0.2)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              No logs found for the current filters
            </Typography>
            <Typography sx={{ color: "rgba(226, 232, 240, 0.68)" }}>
              Adjust the search text or level filter to broaden the result set.
            </Typography>
          </Paper>
        ) : (
          pagedItems.map((log, index) => {
            const tone = levelTone[log.levelKey];

            return (
              <Card
                key={`${log.timestamp}-${log.module}-${index}`}
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: `1px solid ${tone.borderColor}`,
                  background: `linear-gradient(180deg, ${tone.backgroundColor} 0%, rgba(15, 23, 33, 0.94) 100%)`,
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 2.5 }, "&:last-child": { pb: { xs: 2, md: 2.5 } } }}>
                  <Stack spacing={1.5}>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={1.25}
                      justifyContent="space-between"
                    >
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        <Chip
                          label={tone.label}
                          size="small"
                          sx={{
                            color: tone.color,
                            borderColor: tone.borderColor,
                            backgroundColor: tone.backgroundColor,
                          }}
                          variant="outlined"
                        />
                        <Chip
                          label={log.module.replace(/^"(.*)"$/, "$1")}
                          size="small"
                          sx={{
                            color: "rgba(226, 232, 240, 0.76)",
                            borderColor: "rgba(148, 163, 184, 0.22)",
                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                          }}
                          variant="outlined"
                        />
                      </Stack>

                      <Box>
                        <Typography variant="body2" sx={{ color: "rgba(226, 232, 240, 0.74)" }}>
                          {log.fullTimestamp}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "rgba(143, 155, 179, 0.8)" }}>
                          {log.dateDisplay}
                        </Typography>
                      </Box>
                    </Stack>

                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1.7 }}>
                        {log.message}
                      </Typography>
                    </Box>

                    {log.exception ? (
                      <>
                        <Divider sx={{ borderColor: "rgba(148, 163, 184, 0.14)" }} />
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: 3,
                            backgroundColor: "rgba(7, 11, 17, 0.42)",
                            border: "1px solid rgba(148, 163, 184, 0.12)",
                          }}
                        >
                          <Typography variant="caption" sx={{ color: "#ffb3b3", display: "block", mb: 0.75 }}>
                            Exception
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "rgba(226, 232, 240, 0.78)",
                              whiteSpace: "pre-wrap",
                              wordBreak: "break-word",
                              fontFamily: "monospace",
                            }}
                          >
                            {log.exception}
                          </Typography>
                        </Box>
                      </>
                    ) : null}
                  </Stack>
                </CardContent>
              </Card>
            );
          })
        )}
      </Stack>

      <Stack direction="row" justifyContent="center" mt={1}>
        <Pagination
          count={totalPages}
          page={pageNumber}
          onChange={(_, page) => setPageNumber(page)}
          color="primary"
        />
      </Stack>
    </Stack>
  );
};
