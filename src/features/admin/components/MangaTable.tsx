import { Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { IMangaResponse } from "../../../api/manga/manga.types";
import { mangaColumns } from "../columns/MangaColumns";

interface MangaTableProps {
  mangas: IMangaResponse[];
}

export const MangaTable: React.FC<MangaTableProps> = ({ mangas }) => {
  return (
    <Paper
      sx={{
        bgcolor: "#2A2E3E",
        p: 3,
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" mb={2} color="white">
        Latest Mangas
      </Typography>
      <DataGrid
        rows={mangas}
        columns={mangaColumns}
        hideFooter
        disableRowSelectionOnClick
      />
    </Paper>
  );
};
