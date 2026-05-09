import { SxProps, Theme } from "@mui/material/styles";

type SortableAdminItem = object;

const idKeys = ["id", "chapterId"] as const;
const dateKeys = ["createdAt", "timestamp", "date"] as const;

const toNumericDate = (value: unknown) => {
  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value).getTime();
    return Number.isNaN(parsed) ? null : parsed;
  }

  return null;
};

export const sortAdminItems = <T extends SortableAdminItem>(items: T[]): T[] => {
  return [...items].sort((left, right) => {
    const leftRecord = left as Record<string, unknown>;
    const rightRecord = right as Record<string, unknown>;

    for (const key of idKeys) {
      const leftValue = leftRecord[key];
      const rightValue = rightRecord[key];

      if (typeof leftValue === "number" && typeof rightValue === "number") {
        return rightValue - leftValue;
      }
    }

    for (const key of dateKeys) {
      const leftDate = toNumericDate(leftRecord[key]);
      const rightDate = toNumericDate(rightRecord[key]);

      if (leftDate !== null && rightDate !== null) {
        return rightDate - leftDate;
      }
    }

    return 0;
  });
};

export const adminPageShellSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 3,
  width: "100%",
};

export const adminPageHeroSx: SxProps<Theme> = {
  p: { xs: 2.5, md: 3 },
  minHeight: { xs: 88, md: 96 },
  width: "100%",
  borderRadius: 4,
  border: "1px solid rgba(148, 163, 184, 0.16)",
  background:
    "linear-gradient(135deg, rgba(18, 24, 34, 0.98) 0%, rgba(26, 34, 47, 0.94) 100%)",
  boxShadow: "0 22px 60px rgba(0, 0, 0, 0.22)",
  display: "flex",
  alignItems: "center",
};

export const adminPageTitleSx: SxProps<Theme> = {
  fontSize: { xs: "1.55rem", md: "1.75rem" },
  fontWeight: 700,
  lineHeight: 1.15,
  mb: 0,
};

export const adminDataSurfaceSx: SxProps<Theme> = {
  width: "100%",
  borderRadius: 4,
  border: "1px solid rgba(148, 163, 184, 0.14)",
  backgroundColor: "rgba(15, 23, 33, 0.82)",
  boxShadow: "0 14px 38px rgba(0, 0, 0, 0.18)",
  overflow: "hidden",
};

export const adminTableSx: SxProps<Theme> = {
  "& .MuiTableHead-root .MuiTableCell-root": {
    color: "rgba(226, 232, 240, 0.78)",
    borderColor: "rgba(148, 163, 184, 0.14)",
    fontSize: "0.74rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  "& .MuiTableBody-root .MuiTableCell-root": {
    borderColor: "rgba(148, 163, 184, 0.1)",
    color: "rgba(226, 232, 240, 0.9)",
  },
  "& .MuiTableBody-root .MuiTableRow-root:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
};

export const adminPrimaryButtonSx: SxProps<Theme> = {
  borderRadius: 999,
  px: 2.2,
  py: 1.1,
  textTransform: "none",
  fontWeight: 700,
  boxShadow: "none",
  background: "linear-gradient(135deg, #5dade2 0%, #2e86de 100%)",
  "&:hover": {
    boxShadow: "none",
    background: "linear-gradient(135deg, #76bced 0%, #3b97eb 100%)",
  },
};

export const adminOutlineButtonSx: SxProps<Theme> = {
  borderRadius: 999,
  px: 1.6,
  textTransform: "none",
  borderColor: "rgba(148, 163, 184, 0.26)",
  color: "rgba(226, 232, 240, 0.88)",
};

export const adminDataGridSx: SxProps<Theme> = {
  border: "none",
  backgroundColor: "transparent",
  color: "rgba(226, 232, 240, 0.92)",
  "& .MuiDataGrid-columnHeaders": {
    background:
      "linear-gradient(180deg, rgba(17, 24, 39, 0.98) 0%, rgba(13, 19, 28, 0.94) 100%)",
    borderBottom: "1px solid rgba(148, 163, 184, 0.12)",
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "transparent",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 700,
    fontSize: "0.74rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "rgba(226, 232, 240, 0.8)",
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "1px solid rgba(148, 163, 184, 0.08)",
  },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: "1px solid rgba(148, 163, 184, 0.08)",
  },
  "& .MuiDataGrid-filler": {
    backgroundColor: "transparent",
  },
  "& .MuiDataGrid-sortIcon, & .MuiDataGrid-menuIconButton": {
    color: "rgba(226, 232, 240, 0.72)",
  },
};
