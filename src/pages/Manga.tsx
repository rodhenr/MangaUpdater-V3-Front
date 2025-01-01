import { useEffect, useState } from "react";
import BaseButton from "../components/button/BaseButton";
import EditableTable from "../components/dataGrid/EditableTable";
import Modal from "../components/modal/Modal";
import { mockManga } from "../data/fakeData";
import { IData, IRow } from "../interfaces/interfaces";
import "../styles/Manga.scss";

const columns = [
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
];

function Manga() {
  const [data, setData] = useState<IData | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [newItem, setNewItem] = useState<IRow | null>({
    id: 0,
    myAnimeListId: "",
    anilistId: "",
    titleRomaji: "",
    titleEnglish: "",
  });

  useEffect(() => {
    setData({ rows: mockManga, columns });
  }, []);

  const handleOpenModal = () => {
    setNewItem(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setNewItem(null);
    setOpenModal(false);
  };

  const handleAddNewItem = (newItem: IRow) => {
    setData((prevData) => {
      if (!prevData) return { rows: [newItem], columns: columns };
      return { ...prevData, rows: [...prevData.rows, newItem] };
    });

    setOpenModal(false);
  };

  return (
    <div className="manga-page">
      <BaseButton onClick={handleOpenModal} text="Add" />
      {data && <EditableTable columns={data.columns} rows={data.rows} />}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        onAdd={handleAddNewItem}
        columns={columns}
        existingData={newItem}
      />
    </div>
  );
}

export default Manga;
