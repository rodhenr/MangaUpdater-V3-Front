import { useState } from "react";
import EditableTable from "../components/dataGrid/EditableTable";
import { mockLogs } from "../data/fakeData";
import { IData } from "../interfaces/interfaces";
import "../styles/Logs.scss";

function Logs() {
  const [logs, setLogs] = useState<IData | null>({
    columns: [
      { isAdd: false, isEditable: false, field: "id", headerName: "ID" },
      {
        isAdd: false,
        isEditable: false,
        field: "status",
        headerName: "Status",
      },
      {
        isAdd: false,
        isEditable: false,
        field: "source",
        headerName: "Source",
      },
      {
        isAdd: false,
        isEditable: false,
        field: "payload",
        headerName: "Payload",
      },
    ],
    rows: mockLogs,
  });

  const fetchLogs = () => {
    setLogs(logs);
  };

  return (
    <div className="logs-page">
      {logs && <EditableTable columns={logs.columns} rows={logs.rows} />}
    </div>
  );
}

export default Logs;
