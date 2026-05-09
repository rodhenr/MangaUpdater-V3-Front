import { Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { IPagedChaptersResponse } from "../../../api/chapters/chapters.types";
import { adminDataGridSx, adminDataSurfaceSx } from "../admin.helpers";
import { chaptersColumns } from "../columns/ChaptersColumn";

interface ChapterTableProps {
  chapters: IPagedChaptersResponse[];
}

export const ChapterTable: React.FC<ChapterTableProps> = ({ chapters }) => {
  return (
    <Paper
      elevation={0}
      sx={{ ...adminDataSurfaceSx, p: 3, height: 420 }}
    >
      <Typography variant="h6" mb={2} color="white" sx={{ fontWeight: 700 }}>
        Latest Chapters
      </Typography>
      <DataGrid
        rows={chapters}
        columns={chaptersColumns}
        getRowId={(row) => row.chapterId}
        hideFooter
        disableRowSelectionOnClick
        sx={adminDataGridSx}
      />
    </Paper>
  );
};
