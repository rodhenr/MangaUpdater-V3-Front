import { Box, Paper, Stack, Typography } from "@mui/material";
import {
  adminPageHeroSx,
  adminPageShellSx,
  adminPageTitleSx,
} from "../admin.helpers";

export const Queue = () => {
  return (
    <Box sx={adminPageShellSx}>
      <Paper elevation={0} sx={adminPageHeroSx}>
        <Typography sx={adminPageTitleSx}>
          Queue monitor
        </Typography>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px dashed rgba(148, 163, 184, 0.2)",
          backgroundColor: "rgba(15, 23, 33, 0.76)",
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h6">Queue insights coming next</Typography>
          <Typography sx={{ color: "rgba(226, 232, 240, 0.66)" }}>
            Use this area for pending jobs, worker health and retry visibility.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};
