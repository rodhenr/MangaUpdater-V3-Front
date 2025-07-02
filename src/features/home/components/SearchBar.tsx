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
      gap={1}
      mb={4}
      px={2}
    >
      <InputBase
        placeholder="your anilist username"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{
          width: { xs: "100%", sm: 300, md: 350, lg: 400 },
          height: 44,
          px: 1.5,
          borderRadius: "10px",
          fontSize: "0.9rem",
          color: "#eceff1",
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          transition: "all 0.2s ease",
          "&:hover": {
            borderColor: "rgba(255, 255, 255, 0.2)",
          },
          "&:focus-within": {
            borderColor: "#26c6da",
            boxShadow: "0 0 0 2px rgba(38, 198, 218, 0.25)",
          },
          "& input::placeholder": {
            color: "#90a4ae",
            opacity: 1,
          },
        }}
      />
      <Button
        variant="contained"
        onClick={onSearch}
        sx={{
          minWidth: 80,
          height: 44,
          px: 2,
          borderRadius: "8px",
          fontWeight: 600,
          fontSize: "0.9rem",
          textTransform: "none",
          color: "#90a4ae",
          backgroundColor: "transparent",
          border: "1.5px solid #90a4ae",
          transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
          "&:hover": {
            backgroundColor: "#90a4ae",
            color: "#212121",
            borderColor: "#90a4ae",
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};
