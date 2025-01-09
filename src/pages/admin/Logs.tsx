import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchLogs } from "../../api/queries/Queries";
import EditableTable from "../../components/dataGrid/EditableTable";
import { IData, IRow } from "../../interfaces/interfaces";
import "../../styles/Logs.scss";

const columns = [
  { isAdd: false, isEditable: false, field: "id", headerName: "ID" },
  {
    isAdd: false,
    isEditable: false,
    field: "timestamp",
    headerName: "Timestamp",
  },
  {
    isAdd: false,
    isEditable: false,
    field: "module",
    headerName: "Module",
  },
  {
    isAdd: false,
    isEditable: false,
    field: "level",
    headerName: "Level",
  },
  {
    isAdd: false,
    isEditable: false,
    field: "message",
    headerName: "Message",
  },
  {
    isAdd: false,
    isEditable: false,
    field: "exception",
    headerName: "Exception",
  },
];

function Logs() {
  const [data, setData] = useState<IData | null>(null);

  const {
    data: logList,
    error,
    isLoading,
  } = useQuery({ queryKey: ["logs"], queryFn: fetchLogs });

  useEffect(() => {
    if (!logList) return;

    const rows: IRow[] = logList.map((x) => {
      return {
        id: x.id,
        timestamp: new Date(x.timestamp).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        module: x.module,
        level: x.level,
        message: x.message,
        exception: x.exception,
      };
    });

    setData({ rows, columns });
  }, [logList]);

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="logs-page">
      <div>
        {data && (
          <EditableTable columns={data.columns} rows={data.rows} edit={false} />
        )}
      </div>
    </div>
  );
}

export default Logs;
