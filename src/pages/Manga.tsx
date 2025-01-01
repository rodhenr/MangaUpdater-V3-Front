import { useState } from "react";
import BaseButton from "../components/button/BaseButton";
import EditableTable from "../components/dataGrid/EditableTable";
import { mockManga, mockMangaSource, mockSource } from "../data/fakeData";
import { IData, IManga, IMangaSource, ISource } from "../interfaces/interfaces";
import "../styles/Manga.scss";

type ActiveData =
  | { type: "manga"; data: IManga[] }
  | { type: "source"; data: ISource[] }
  | { type: "mangasource"; data: IMangaSource[] };

function Manga() {
  const [activeData, setActiveData] = useState<IData | null>(null);

  const handleButtonClick = (type: ActiveData["type"]) => {
    if (type === "manga") {
      setActiveData({
        columns: [
          { isEditable: false, field: "id", headerName: "ID" },
          {
            isEditable: true,
            field: "myAnimeListId",
            headerName: "ID MyAnimeList",
          },
          { isEditable: true, field: "anilistId", headerName: "ID Anilist" },
          {
            isEditable: true,
            field: "titleRomaji",
            headerName: "Romaji Title",
          },
          {
            isEditable: true,
            field: "titleEnglish",
            headerName: "English Title",
          },
        ],
        rows: mockManga,
      });
    } else if (type === "source") {
      setActiveData({
        columns: [
          { isEditable: false, field: "id", headerName: "ID" },
          { isEditable: true, field: "name", headerName: "Name" },
          { isEditable: true, field: "baseUrl", headerName: "Base URL" },
        ],
        rows: mockSource,
      });
    } else if (type === "mangasource") {
      setActiveData({
        columns: [
          { isEditable: false, field: "id", headerName: "ID" },
          { isEditable: true, field: "mangaId", headerName: "ID Manga" },
          { isEditable: true, field: "sourceId", headerName: "ID Source" },
          { isEditable: true, field: "url", headerName: "URL" },
        ],
        rows: mockMangaSource,
      });
    }
  };

  return (
    <div className="manga-page">
      <div className="button-container">
        <BaseButton onClick={() => handleButtonClick("manga")} text="Manga" />
        <BaseButton onClick={() => handleButtonClick("source")} text="Source" />
        <BaseButton
          onClick={() => handleButtonClick("mangasource")}
          text="MangaSource"
        />
      </div>
      {activeData && (
        <EditableTable columns={activeData.columns} rows={activeData.rows} />
      )}
    </div>
  );
}

export default Manga;
