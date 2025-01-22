"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { GETAll, getAPIUPDATEPATH } from "@/src/Actions/ApiCalls/apiActions";

const DataBaseTable = "Regions";
const DropdownDataBaseTable = "Countries";

export default function EditRegions({
  id,
  regionsName,
  latitude,
  longitude,
  country,
}: any) {
  const [newRegionsName, setNewRegionsName] = useState(regionsName);
  const [newLatitude, setNewLatitude] = useState(latitude);
  const [newLongitude, setNewLongitude] = useState(longitude);
  const [newCountry, setNewCountry] = useState(country);

  const [countriesList, setCountriesList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getDropdownList = async () => {
      setCountriesList(await GETAll(DropdownDataBaseTable));
    };
    getDropdownList();
  }, []);

  const apiURI: string = getAPIUPDATEPATH(
    usePathname().toLowerCase().replace("edit/", "")
  );

  //console.log(apiURI);
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await fetch(apiURI, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newRegionsName,
          newLatitude,
          newLongitude,
          newCountry,
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
              RegionsName
            </label>
            <input
              onChange={(e) => setNewRegionsName(e.target.value)}
              value={newRegionsName}
              type="text"
              placeholder="RegionsName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              latitude
            </label>
            <input
              onChange={(e) => setNewLatitude(e.target.value)}
              value={newLatitude}
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
              onChange={(e) => setNewLongitude(e.target.value)}
              value={newLongitude}
              type="number"
              placeholder="longitude"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              country
            </label>
            <select
              onChange={(e) => setNewCountry(e.target.value)}
              value={newCountry}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            >
              <option></option>
              {countriesList
                ? countriesList.map((x: any) => {
                  return (
                    <option key={x._id} value={x._id}>
                      {x.countriesName}
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

// "use client";

// import { useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { getAPIDATA, getAPIUPDATEPATH } from "@/lib/functions";

// const DataBaseTable = "Regions";
// export default function EditRegions({
//   id,
//   shortCode,
//   RegionsName,
//   latitude,
//   longitude,
//   category,
// }: any) {
//   const [newShortCode, setNewShortCode] = useState(shortCode);
//   const [newRegionsName, setNewRegionsName] =
//     useState(RegionsName);
//   const [newLatitude, setNewLatitude] = useState(latitude);
//   const [newLongitude, setNewLongitude] = useState(longitude);
//   const [newCategory, setNewCategory] = useState(category);

//   const router = useRouter();

//   const apiURI: string = getAPIUPDATEPATH(
//     usePathname().toLowerCase().replace("edit/", "")
//   );

//   const handleSubmit = async (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(apiURI, {
//         method: "PUT",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({
//           newShortCode,
//           newRegionsName,
//           newLatitude,
//           newLongitude,
//           newCategory,
//           id,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to update Record");
//       }

//       router.refresh();
//       router.push(`/${DataBaseTable}`);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="w-full max-w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <h5 className="text-xl font-medium text-gray-900 dark:text-white">
//           Edit Record - Categories
//         </h5>
//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//             ShortCode
//           </label>
//           <input
//             onChange={(e) => setNewShortCode(e.target.value)}
//             value={newShortCode}
//             type="text"
//             placeholder="ShortCode"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//             RegionsName
//           </label>
//           <input
//             onChange={(e) => setNewRegionsName(e.target.value)}
//             value={newRegionsName}
//             type="text"
//             placeholder="RegionsName"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:green:ring-blue-800"
//         >
//           Update Your Data
//         </button>
//       </form>
//     </div>
//   );
// }
