import { Error as ErrorIcon, Info as InfoIcon } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

interface LogItem {
  id: number;
  level: number;
  message: string;
  module: string;
  timestamp: string;
}

interface LogsPanelProps {
  logs: LogItem[];
}

export const LogsPanel: React.FC<LogsPanelProps> = ({ logs }) => {
  return (
    <>
      {logs.map((log) => (
        <Box key={log.id} display="flex" alignItems="center" mb={1.5}>
          {log.level === 2 && <InfoIcon color="info" sx={{ mr: 1 }} />}
          {log.level === 4 && <ErrorIcon color="error" sx={{ mr: 1 }} />}
          <Typography variant="body2" color="white">
            [{log.timestamp}] {log.message} (
            {log.module.replace(/^"(.*)"$/, "$1")})
          </Typography>
        </Box>
      ))}
    </>
  );
};
