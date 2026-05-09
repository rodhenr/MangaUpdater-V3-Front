import {
  BugReportOutlined,
  ErrorOutline,
  InfoOutlined,
  PriorityHigh,
  WarningAmber,
} from "@mui/icons-material";
import { Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import { getLogLevelMeta } from "../../../api/logs/logs.types";

interface LogItem {
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
    <Stack spacing={1.25}>
      {logs.map((log) => {
        const levelMeta = getLogLevelMeta(log.level);
        const tone =
          levelMeta.key === "critical"
            ? {
                color: "#ffb0cf",
                borderColor: "rgba(255, 77, 141, 0.35)",
                backgroundColor: "rgba(255, 77, 141, 0.12)",
                icon: <PriorityHigh />,
              }
            : levelMeta.key === "error"
            ? {
                color: "#ffb3b3",
                borderColor: "rgba(255, 107, 107, 0.3)",
                backgroundColor: "rgba(255, 107, 107, 0.1)",
                icon: <ErrorOutline />,
              }
            : levelMeta.key === "warning"
            ? {
                color: "#ffe08a",
                borderColor: "rgba(245, 196, 81, 0.28)",
                backgroundColor: "rgba(245, 196, 81, 0.1)",
                icon: <WarningAmber />,
              }
            : levelMeta.key === "debug" || levelMeta.key === "trace"
            ? {
                color: "#d7d1ff",
                borderColor: "rgba(155, 140, 255, 0.25)",
                backgroundColor: "rgba(155, 140, 255, 0.08)",
                icon: <BugReportOutlined />,
              }
            : {
                color: "#9fdcff",
                borderColor: "rgba(93, 173, 226, 0.24)",
                backgroundColor: "rgba(93, 173, 226, 0.08)",
                icon: <InfoOutlined />,
              };

        return (
          <Box
            key={`${log.timestamp}-${log.module}-${log.message}`}
            sx={{
              p: 1.5,
              borderRadius: 3,
              border: "1px solid rgba(148, 163, 184, 0.12)",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
            }}
          >
            <Stack spacing={1}>
              <Stack direction="row" spacing={1} alignItems="center" useFlexGap flexWrap="wrap">
                <Chip
                  icon={tone.icon}
                  label={levelMeta.label}
                  size="small"
                  variant="outlined"
                  sx={{
                    color: tone.color,
                    borderColor: tone.borderColor,
                    backgroundColor: tone.backgroundColor,
                  }}
                />
              <Chip
                label={log.module.replace(/^"(.*)"$/, "$1")}
                size="small"
                variant="outlined"
                sx={{
                  color: "rgba(226, 232, 240, 0.72)",
                  borderColor: "rgba(148, 163, 184, 0.18)",
                }}
              />
              <Typography variant="caption" sx={{ color: "rgba(226, 232, 240, 0.58)" }}>
                {log.timestamp}
              </Typography>
            </Stack>
            <Typography variant="body2" color="white" sx={{ lineHeight: 1.65 }}>
              {log.message}
            </Typography>
          </Stack>
          </Box>
        );
      })}
    </Stack>
  );
};
