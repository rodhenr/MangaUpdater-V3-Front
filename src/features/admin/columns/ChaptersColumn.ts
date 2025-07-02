import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IPagedChaptersResponse } from "../../../api/chapters/chapters.types";

export const chaptersColumns: GridColDef<IPagedChaptersResponse>[] = [
  {
    field: "manga",
    headerName: "Manga",
    flex: 1,
  },
  {
    field: "source",
    headerName: "Source",
    flex: 1,
  },
  {
    field: "number",
    headerName: "Number",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Added Date",
    minWidth: 150,
    renderCell: (params: GridRenderCellParams<IPagedChaptersResponse>) => {
      const createdAt = params.row.timestamp;

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
];
