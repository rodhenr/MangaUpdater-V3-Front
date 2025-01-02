import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { postManga } from "../api/commands/Commands";
import { fetchMangas } from "../api/queries/Queries";
import BaseButton from "../components/button/BaseButton";
import EditableTable from "../components/dataGrid/EditableTable";
import Modal from "../components/modal/Modal";
import { IData, IMangaPost, IRow } from "../interfaces/interfaces";
import "../styles/Manga.scss";

const columns = [
  { isAdd: false, isEditable: false, field: "id", headerName: "ID" },
  {
    isAdd: true,
    isEditable: true,
    field: "myAnimeListId",
    headerName: "ID MyAnimeList",
  },
  {
    isAdd: true,
    isEditable: true,
    field: "anilistId",
    headerName: "ID Anilist",
  },
  {
    isAdd: true,
    isEditable: true,
    field: "titleRomaji",
    headerName: "Romaji Title",
  },
  {
    isAdd: true,
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

  const {
    data: mangaList,
    error,
    isLoading,
  } = useQuery({ queryKey: ["manga"], queryFn: fetchMangas });

  const mutation = useMutation({ mutationFn: postManga });

  useEffect(() => {
    if (!mangaList) return;

    const rows: IRow[] = mangaList.map((x) => {
      return {
        id: x.id,
        myAnimeListId: x.myAnimeListId,
        anilistId: x.aniListId,
        titleEnglish: x.titleEnglish,
        titleRomaji: x.titleRomaji,
      };
    });

    setData({ rows, columns });
  }, [mangaList]);

  const handleOpenModal = () => {
    setNewItem(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setNewItem(null);
    setOpenModal(false);
  };

  const handleAddNewItem = async (newItem: IRow) => {
    try {
      const manga: IMangaPost = {
        aniListId: Number(newItem["anilistId"]),
        myAnimeListId: Number(newItem["myAnimeListId"]),
        titleEnglish: String(newItem["titleEnglish"]),
        titleRomaji: String(newItem["titleRomaji"]),
      };

      await mutation.mutateAsync(manga);
    } catch (err) {
      alert(err);
    }

    setOpenModal(false);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div>
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
