"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GETAll, getAPIDATA } from "@/src/Actions/ApiCalls/apiActions";

const DataBaseTable = "Districts";
const DropdownDataBaseTable = "Regions";

export default function CreateDistricts() {
  const [districtsName, setDistrictsName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [region, setRegion] = useState("");

  const [regionsList, setRegionsList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getDropdowns = async () => {
      setRegionsList(await GETAll(DropdownDataBaseTable));
    };
    getDropdowns();
  }, []);


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await fetch(getAPIDATA(DataBaseTable), {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          districtsName,
          latitude,
          longitude,
          region,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update record");
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
              DistrictsName
            </label>
            <input
              onChange={(e) => setDistrictsName(e.target.value)}
              value={districtsName}
              type="text"
              placeholder="DistrictsName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              latitude
            </label>
            <input
              onChange={(e) => setLatitude(e.target.value)}
              value={latitude}
              type="number"
              placeholder="latitude"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              longitude
            </label>
            <input
              onChange={(e) => setLongitude(e.target.value)}
              value={longitude}
              type="number"
              placeholder="longitude"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              region
            </label>
            <select
              onChange={(e) => setRegion(e.target.value)}
              value={region}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            >
              <option></option>
              {regionsList
                ? regionsList.map((x: any) => {
                  return (
                    <option key={x._id} value={x._id}>
                      {x.regionsName}
                    </option>
                  );
                })
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
