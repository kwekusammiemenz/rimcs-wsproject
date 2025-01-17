"use client";

import { useRouter } from "next/navigation";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { DELETEData } from "../lib/apiActions";

function EditButton({ tableName, id }: any) {
  const router = useRouter();

  const EditQuery = async () => {
    router.push(`${tableName}/Edit/${id}`);
  };

  return (
    <button
      onClick={EditQuery}
      className="font-medium text-green-600 dark:text-green-500 hover:underline ms-3"
    >
      <HiOutlinePencilAlt size={24} />
    </button>
  );
}

function DeleteButton({ tableName, id }: any) {
  const router = useRouter();
  const DeleteQuery = async () => {
    const confirmed = confirm("Are You Sure Of Deleting This Record?");

    if (confirmed) {
      const res = await DELETEData(id, tableName.toLowerCase());

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button
      onClick={DeleteQuery}
      className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
    >
      <HiOutlineTrash size={24} />
    </button>
  );
}

export { EditButton, DeleteButton };
