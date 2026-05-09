import { Box, Button, InputBase } from "@mui/material";
import React from "react";

type Props = {
  inputValue: string;
  setInputValue: (val: string) => void;
  onSearch: () => void;
};

export const SearchBar: React.FC<Props> = ({
  inputValue,
  setInputValue,
  onSearch,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={0.75}
      mb={2.5}
      px={2}
    >
      <InputBase
        placeholder="your anilist username"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{
          width: { xs: "100%", sm: 280, md: 320, lg: 360 },
          height: 38,
          px: 1.25,
          borderRadius: "9px",
          fontSize: "0.85rem",
          color: "#e2e8f0",
          backgroundColor: "rgba(15, 23, 33, 0.88)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(148, 163, 184, 0.16)",
          transition: "all 0.2s ease",
          "&:hover": {
            borderColor: "rgba(148, 163, 184, 0.28)",
          },
          "&:focus-within": {
            borderColor: "#5dade2",
            boxShadow: "0 0 0 2px rgba(93, 173, 226, 0.22)",
          },
          "& input::placeholder": {
            color: "#8ea0b8",
            opacity: 1,
          },
        }}
      />
      <Button
        variant="contained"
        onClick={onSearch}
        sx={{
          minWidth: 72,
          height: 38,
          px: 1.75,
          borderRadius: "8px",
          fontWeight: 600,
          fontSize: "0.82rem",
          textTransform: "none",
          color: "#e2e8f0",
          background: "linear-gradient(135deg, #5dade2 0%, #2e86de 100%)",
          border: "1px solid rgba(93, 173, 226, 0.24)",
          boxShadow: "none",
          transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
          "&:hover": {
            background: "linear-gradient(135deg, #76bced 0%, #3b97eb 100%)",
            borderColor: "rgba(118, 188, 237, 0.32)",
            boxShadow: "none",
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};
