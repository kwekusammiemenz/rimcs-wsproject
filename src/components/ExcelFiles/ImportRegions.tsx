"use client";

import * as XLSX from "xlsx";
import { GETAll } from "@/src/Actions/ApiCalls/apiActions";
import { createBulkRegions } from "@/src/Actions/ApiSaves/apiSaveRegions";
import { RegionsProps } from "@/src/Types/DataTypesProps";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DataBaseTable: string = "Regions";
const subDataBaseTable: string = "Countries";

export default function ImportRegions() {
  const router = useRouter();
  const [dataList, setDataList] = useState([]);
  const [subDataList, setSubDataList] = useState([]);

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState("");

  useEffect(() => {
    const getData = async () => {
      setDataList(await GETAll(DataBaseTable));
      setSubDataList(await GETAll(subDataBaseTable));
    };
    getData();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      if (file) {
        setLoading(true);

        const reader = new FileReader();

        reader.onload = async (e) => {
          const data = e.target?.result;

          if (data) {
            const workbook = XLSX.read(data, { type: "binary" });
            // SheetName
            const sheetName = workbook.SheetNames[0];
            // Worksheet
            const workSheet = workbook.Sheets[sheetName];
            // Json
            const json: RegionsProps[] = XLSX.utils.sheet_to_json(workSheet);
            const recQuery = subDataList;

            try {
              const res = await createBulkRegions(
                json,
                recQuery,
                DataBaseTable
              );
              if (res == true) {
                setLoading(false);
                router.refresh();
                router.push(`/${DataBaseTable}`);
              }
            } catch (error) {
              console.log(error);
            }
          }
        };
        reader.readAsBinaryString(file);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // json stringified (purpose of previewing)
  function previewData() {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          // SheetName
          const sheetName = workbook.SheetNames[0];
          // Worksheet
          const workSheet = workbook.Sheets[sheetName];
          // Json
          const json = XLSX.utils.sheet_to_json(workSheet);
          setJsonData(JSON.stringify(json, null, 2));
        }
      };
      reader.readAsBinaryString(file);
    }
  }

  return (
    <div className="py-8 space-y-8">
      <div className="flex items-center gap-8">
        <div className="">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            accept=".xls,.xlsx"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        <button
          onClick={previewData}
          className="py-2 px-6 rounded bg-slate-300 text-slate-900 "
        >
          Preview Data
        </button>
        <button
          onClick={handleSubmit}
          className="py-2 px-6 rounded bg-purple-600 text-slate-100 "
        >
          Save Data
        </button>
      </div>

      <pre>{jsonData}</pre>

      {loading ? (
        <p>Saving Data please wait...</p>
      ) : (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  latitiude
                </th>
                <th scope="col" className="px-6 py-3">
                  longitude
                </th>
                <th scope="col" className="px-6 py-3">
                  reference
                </th>
              </tr>
            </thead>
            {/* <tbody>
              {dataList
                ? dataList.map((x: any, index) => {
                    {
                      return subDataList
                        ? subDataList.map((c: any) => {
                            if (x.country === c._id) {
                              return (
                                <tr
                                  key={index}
                                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                  >
                                    {x.districtsName}
                                  </th>
                                  <td className="px-6 py-4">{x.latitude}</td>
                                  <td className="px-6 py-4">{x.longitude}</td>
                                  <td className="px-6 py-4">{c.regionsName}</td>
                                </tr>
                              );
                            }
                          })
                        : null;
                    }
                  })
                : null}
            </tbody> */}
          </table>
        </div>
      )}

      {/* Table */}
    </div>
  );
}
