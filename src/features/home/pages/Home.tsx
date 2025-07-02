import { CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import MangaModal from "../../../components/mangaModal/MangaModal";
import { SearchBar } from "../components/SearchBar";
import { UserDataGrid } from "../components/UserDataGrid";
import { useUserData } from "../hooks/useUserMangaData";

export const Home: React.FC = () => {
  const { inputValue, setInputValue, setUsername, userData, query } =
    useUserData();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedId(null);
    setIsModalOpen(false);
  };

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    if (trimmed) setUsername(trimmed);
  };

  if (query.isError && query.error instanceof Error) {
    return <Typography color="error">Error: {query.error.message}</Typography>;
  }

  return (
    <>
      <SearchBar
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSearch={handleSearch}
      />
      {query.isLoading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
      ) : (
        <UserDataGrid data={userData} onCardClick={handleCardClick} />
      )}
      {isModalOpen && selectedId !== null && (
        <MangaModal
          open={isModalOpen}
          onClose={handleCloseModal}
          id={selectedId}
        />
      )}
    </>
  );
};
