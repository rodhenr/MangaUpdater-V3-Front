import { IconButton, Stack } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IMangaResponse } from "../../../api/manga/manga.types";

export const mangaColumns: GridColDef<IMangaResponse>[] = [
  {
    field: "titleEnglish",
    headerName: "Title",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Added Date",
    minWidth: 150,
    renderCell: (params: GridRenderCellParams<IMangaResponse>) => {
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
    renderCell: (params: GridRenderCellParams<IMangaResponse, unknown>) => {
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
