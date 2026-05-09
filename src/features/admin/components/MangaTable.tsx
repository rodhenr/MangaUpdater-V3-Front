import { Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { IMangaResponse } from "../../../api/manga/manga.types";
import { adminDataGridSx, adminDataSurfaceSx } from "../admin.helpers";
import { mangaColumns } from "../columns/MangaColumns";

interface MangaTableProps {
  mangas: IMangaResponse[];
}

export const MangaTable: React.FC<MangaTableProps> = ({ mangas }) => {
  return (
    <Paper
      elevation={0}
      sx={{ ...adminDataSurfaceSx, p: 3, height: 420 }}
    >
      <Typography variant="h6" mb={2} color="white" sx={{ fontWeight: 700 }}>
        Latest Mangas
      </Typography>
      <DataGrid
        rows={mangas}
        columns={mangaColumns}
        hideFooter
        disableRowSelectionOnClick
        sx={adminDataGridSx}
      />
    </Paper>
  );
};
