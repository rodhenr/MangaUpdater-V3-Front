import { useEffect, useState } from "react";
import BaseButton from "../components/button/BaseButton";
import EditableTable from "../components/dataGrid/EditableTable";
import Modal from "../components/modal/Modal";
import { mockSource } from "../data/fakeData";
import { IData, IRow } from "../interfaces/interfaces";
import "../styles/Manga.scss";

const columns = [
  { isEditable: false, field: "id", headerName: "ID" },
  { isEditable: true, field: "name", headerName: "Name" },
  { isEditable: true, field: "baseUrl", headerName: "Base URL" },
];

function Source() {
  const [data, setData] = useState<IData | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [newItem, setNewItem] = useState<IRow | null>({
    id: 0,
    name: "",
    baseUrl: "",
  });

  useEffect(() => {
    setData({ rows: mockSource, columns: columns });
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
    <div className="source-page">
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
