import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchMangaSources } from "../api/queries/Queries";
import BaseButton from "../components/button/BaseButton";
import EditableTable from "../components/dataGrid/EditableTable";
import Modal from "../components/modal/Modal";
import { IData, IRow } from "../interfaces/interfaces";
import "../styles/Manga.scss";

const columns = [
  { isEditable: false, field: "id", headerName: "ID" },
  { isEditable: true, field: "mangaId", headerName: "ID Manga" },
  { isEditable: false, field: "mangaName", headerName: "Manga" },
  { isEditable: true, field: "sourceId", headerName: "ID Source" },
  { isEditable: false, field: "sourceName", headerName: "Source" },
  { isEditable: true, field: "url", headerName: "URL" },
];

function MangaSource() {
  const [data, setData] = useState<IData | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [newItem, setNewItem] = useState<IRow | null>({
    id: 0,
    mangaId: 0,
    sourceId: 0,
    url: "",
  });

  const {
    data: sourceList,
    error,
    isLoading,
  } = useQuery({ queryKey: ["mangaSource"], queryFn: fetchMangaSources });

  useEffect(() => {
    if (!sourceList) return;

    const rows: IRow[] = sourceList.map((x) => {
      return {
        id: x.id,
        mangaId: x.mangaId,
        mangaName: x.mangaName,
        sourceId: x.sourceId,
        sourceName: x.sourceName,
        url: x.url,
      };
    });

    setData({ rows, columns });
  }, [sourceList]);

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

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

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

export default MangaSource;
