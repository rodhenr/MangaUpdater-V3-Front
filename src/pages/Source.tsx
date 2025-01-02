import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { postSource } from "../api/commands/Commands";
import { fetchSources } from "../api/queries/Queries";
import BaseButton from "../components/button/BaseButton";
import EditableTable from "../components/dataGrid/EditableTable";
import Modal from "../components/modal/Modal";
import { IData, IRow, ISourcePost } from "../interfaces/interfaces";
import "../styles/Manga.scss";

const columns = [
  { isAdd: false, isEditable: false, field: "id", headerName: "ID" },
  { isAdd: true, isEditable: true, field: "name", headerName: "Name" },
  { isAdd: true, isEditable: true, field: "baseUrl", headerName: "Base URL" },
];

function Source() {
  const [data, setData] = useState<IData | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [newItem, setNewItem] = useState<IRow | null>({
    id: 0,
    name: "",
    baseUrl: "",
  });

  const {
    data: sourceList,
    error,
    isLoading,
  } = useQuery({ queryKey: ["manga"], queryFn: fetchSources });

  const mutation = useMutation({ mutationFn: postSource });

  useEffect(() => {
    if (!sourceList) return;

    const rows: IRow[] = sourceList.map((x) => {
      return {
        id: x.id,
        name: x.name,
        baseUrl: x.baseUrl,
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

  const handleAddNewItem = async (newItem: IRow) => {
    try {
      const source: ISourcePost = {
        name: String(newItem["name"]),
        baseUrl: String(newItem["baseUrl"]),
      };

      await mutation.mutateAsync(source);
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

export default Source;
