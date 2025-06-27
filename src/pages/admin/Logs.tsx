import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchLogs } from "../../api/queries/Queries";
import EditableTable from "../../components/dataGrid/EditableTable";

const columns = [
  { isAdd: false, isEditable: false, field: "id", headerName: "ID" },
  {
    isAdd: false,
    isEditable: false,
    field: "timestamp",
    headerName: "Timestamp",
  },
  { isAdd: false, isEditable: false, field: "module", headerName: "Module" },
  { isAdd: false, isEditable: false, field: "level", headerName: "Level" },
  { isAdd: false, isEditable: false, field: "message", headerName: "Message" },
  {
    isAdd: false,
    isEditable: false,
    field: "exception",
    headerName: "Exception",
  },
];

const Logs: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["logs"],
    queryFn: fetchLogs,
    select: (logs) =>
      logs.map((log) => ({
        id: log.id,
        timestamp: new Date(log.timestamp).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        module: log.module,
        level: log.level,
        message: log.message,
        exception: log.exception,
      })),
  });

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (error instanceof Error)
    return (
      <Box mt={4}>
        <Alert severity="error">Error: {error.message}</Alert>
      </Box>
    );

  return (
    <Box mt={4} px={2}>
      <Typography variant="h5" mb={2}>
        Logs
      </Typography>
      {data && <EditableTable columns={columns} rows={data} edit={false} />}
    </Box>
  );
};

export default Logs;
