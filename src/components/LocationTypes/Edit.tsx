"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAPIUPDATEPATH } from "@/src/Actions/ApiCalls/apiActions";

const DataBaseTable = "LocationTypes";

export default function EditLocationTypes({ id, locationTypesName }: any) {
  const [newLocationTypesName, setNewLocationTypesName] = useState(locationTypesName);

  const router = useRouter();

  const apiURI: string = getAPIUPDATEPATH(
    usePathname().toLowerCase().replace("edit/", "")
  );

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await fetch(apiURI, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newLocationTypesName,
          id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update Record");
      }

      router.refresh();
      router.push(`/${DataBaseTable}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full max-w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Add New Record - {DataBaseTable}
          </h5>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              LocationTypesName
            </label>
            <input
              onChange={(e) => setNewLocationTypesName(e.target.value)}
              value={newLocationTypesName}
              type="text"
              placeholder="LocationTypesName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:green:ring-blue-800"
          >
            Save Your Data
          </button>
        </form>
      </div>
    </>
  );
}
