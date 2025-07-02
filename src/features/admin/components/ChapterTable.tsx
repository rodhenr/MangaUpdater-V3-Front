import { Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { IPagedChaptersResponse } from "../../../api/chapters/chapters.types";
import { chaptersColumns } from "../columns/ChaptersColumn";

interface ChapterTableProps {
  chapters: IPagedChaptersResponse[];
}

export const ChapterTable: React.FC<ChapterTableProps> = ({ chapters }) => {
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
        Latest Chapters
      </Typography>
      <DataGrid
        rows={chapters}
        columns={chaptersColumns}
        getRowId={(row) => row.chapterId}
        hideFooter
        disableRowSelectionOnClick
      />
    </Paper>
  );
};
