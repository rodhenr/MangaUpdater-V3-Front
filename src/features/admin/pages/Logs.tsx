import {
  Alert,
  Box,
  CircularProgress,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchPagedLogs } from "../../../api/logs/logs.queries";

export const Logs: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 20;

  const { data, error, isLoading } = useQuery({
    queryKey: ["logs", { pageNumber, pageSize }],
    queryFn: fetchPagedLogs,
    select: (result) => ({
      ...result,
      items: result.items.map((log) => {
        const timestampDate = new Date(log.timestamp);
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
          levelText:
            log.level === 2
              ? "Info"
              : log.level === 4
              ? "Error"
              : `Unknown (${log.level})`,
        };
      }),
    }),
  });

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
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Module</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Exception</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.items.map((log, index) => (
              <TableRow key={index}>
                <TableCell title={log.fullTimestamp}>
                  {log.dateDisplay}
                </TableCell>
                <TableCell>{log.module}</TableCell>
                <TableCell>{log.levelText}</TableCell>
                <TableCell>{log.message}</TableCell>
                <TableCell>{log.exception || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" justifyContent="center" mt={4}>
        <Pagination
          count={data?.totalPages || 0}
          page={pageNumber}
          onChange={(_, page) => setPageNumber(page)}
          color="primary"
        />
      </Stack>
    </Box>
  );
};
