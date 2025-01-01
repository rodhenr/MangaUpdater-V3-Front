import { useState } from "react";
import BaseButton from "../components/button/BaseButton";
import EditableTable from "../components/dataGrid/EditableTable";
import { mockLogs } from "../data/fakeData";
import { IData } from "../interfaces/interfaces";
import "../styles/Logs.scss";

function Logs() {
  const [logs, setLogs] = useState<IData | null>({
    columns: [
      { isEditable: false, field: "id", headerName: "ID" },
      { isEditable: false, field: "status", headerName: "Status" },
      { isEditable: false, field: "source", headerName: "Source" },
      { isEditable: false, field: "payload", headerName: "Payload" },
    ],
    rows: mockLogs,
  });

  const fetchLogs = () => {
    setLogs(logs);
  };

  return (
    <div className="logs-page">
      <div className="button-container">
        <BaseButton onClick={() => fetchLogs()} text="Update Logs" />
      </div>
      {logs && <EditableTable columns={logs.columns} rows={logs.rows} />}
    </div>
  );
}

export default Logs;
