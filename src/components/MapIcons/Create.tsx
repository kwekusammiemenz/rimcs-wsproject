"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GETAll, getAPIDATA } from "@/src/lib/apiActions";
import { convertToBase64 } from "@/src/lib/functions";

const DataBaseTable = "MapIcons";
const DropdownDataBaseTable = "Operators";

export default function CreateMapIcons() {
  const router = useRouter();
  const [mapIconsName, setMapIconsName] = useState<{ [key: string]: any }>({});
  const [operator, setOperator] = useState("");
  const [listOperators, setListOperators] = useState([]);

  useEffect(() => {
    const getDropdownList = async () => {
      setListOperators(await GETAll(DropdownDataBaseTable));
    };
    getDropdownList();
  }, []);

  const createPost = async (newImage: any) => {
    try {
      const { mapIconsName } = await newImage;

      try {
        const res = await fetch(getAPIDATA(DataBaseTable), {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            mapIconsName,
            operator,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to update record");
        }

        router.refresh();
        router.push("/MapIcons");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createPost(mapIconsName);
  };

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setMapIconsName({ ...mapIconsName, mapIconsName: base64 });
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
              mapIconsName
            </label>
            <input
              type="file"
              aria-label="image"
              name="mapIconsName"
              id="file-upload"
              accept=".png"
              onChange={(e) => handleFileUpload(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Operator
            </label>
            <select
              onChange={(e) => setOperator(e.target.value)}
              value={operator}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            >
              <option></option>
              {listOperators
                ? listOperators.map((x: any, index) => (
                    <option key={index} value={x._id}>
                      {x.operatorsName}
                    </option>
                  ))
                : null}
            </select>
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
