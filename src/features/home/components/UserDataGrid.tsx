import { Grid, Typography } from "@mui/material";
import { IUserMangaData } from "../../../api/user/user.types";
import { UserDataCard } from "./UserDataCard";

type Props = {
  data: IUserMangaData[] | null;
  onCardClick: (id: number) => void;
};

export const UserDataGrid = ({ data, onCardClick }: Props) => {
  if (!data || data.length === 0) {
    return (
      <Typography sx={{ width: "100%", textAlign: "center", mt: 4 }}>
        No data found.
      </Typography>
    );
  }

  return (
    <Grid
      container
      spacing={2}
      columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 10 }}
      sx={{ marginBottom: "2rem" }}
    >
      {data.map((userData) => (
        <UserDataCard
          key={userData.anilistId}
          data={userData}
          onClick={onCardClick}
        />
      ))}
    </Grid>
  );
};
