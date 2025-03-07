"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { GETAll, getAPIUPDATEPATH } from "@/src/Actions/ApiCalls/apiActions";

const DataBaseTable = "WeatherStations";
const LocationTypesDropdownDataBaseTable = "LocationTypes";
const CountriesDropdownDataBaseTable = "Countries";
const RegionsDropdownDataBaseTable = "Regions";
const DistrictsDropdownDataBaseTable = "Districts";
const OperatorsDropdownDataBaseTable = "Operators";
const StationsNaturesDropdownDataBaseTable = "StationsNatures";

export default function EditWeatherStations({
  id,
  weatherStationsName,
  locationType,
  location,
  country,
  region,
  district,
  dateOfInstallation,
  operator,
  dataFrequency,
  stationStatus,
  observedParameters,
  accuracyLevel,
  communicationSystem,
  latitude,
  longitude,
  elevation,
  stationsNatures,
}: any) {
  const [newWeatherStationsName, setNewWeatherStationsName] =
    useState(weatherStationsName);
  const [newLocationType, setNewLocationType] = useState(locationType);
  const [newLocation, setNewLocation] = useState(location);
  const [newCountry, setNewCountry] = useState(country);
  const [newRegion, setNewRegion] = useState(region);
  const [newDistrict, setNewDistrict] = useState(district);
  const [newDateOfInstallation, setNewDateOfInstallation] =
    useState(dateOfInstallation);
  const [newOperator, setNewOperator] = useState(operator);
  const [newDataFrequency, setNewDataFrequency] = useState(dataFrequency);
  const [newStationStatus, setNewStationStatus] = useState(stationStatus);
  const [newObservedParameters, setNewObservedParameters] =
    useState(observedParameters);
  const [newAccuracyLevel, setNewAccuracyLevel] = useState(accuracyLevel);
  const [newCommunicationSystem, setNewCommunicationSystem] =
    useState(communicationSystem);
  const [newLatitude, setNewLatitude] = useState(latitude);
  const [newLongitude, setNewLongitude] = useState(longitude);
  const [newElevation, setNewElevation] = useState(elevation);
  const [newStationsNatures, setNewStationsNatures] = useState(stationsNatures);

  const [locationTypesList, setLocationTypesList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const [regionsList, setRegionsList] = useState([]);
  const [districtsList, setDistrictsList] = useState([]);
  const [operatorsList, setOperatorsList] = useState([]);
  const [stationsNaturesList, setStationsNaturesList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getDropDowns = async () => {
      setLocationTypesList(await GETAll(LocationTypesDropdownDataBaseTable));
      setCountriesList(await GETAll(CountriesDropdownDataBaseTable));
      setRegionsList(await GETAll(RegionsDropdownDataBaseTable));
      setDistrictsList(await GETAll(DistrictsDropdownDataBaseTable));
      setOperatorsList(await GETAll(OperatorsDropdownDataBaseTable));
      setStationsNaturesList(
        await GETAll(StationsNaturesDropdownDataBaseTable)
      );
    };
    getDropDowns();
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
          newWeatherStationsName,
          newLocationType,
          newLocation,
          newCountry,
          newRegion,
          newDistrict,
          newDateOfInstallation,
          newOperator,
          newDataFrequency,
          newStationStatus,
          newObservedParameters,
          newAccuracyLevel,
          newCommunicationSystem,
          newLatitude,
          newLongitude,
          newElevation,
          newStationsNatures,
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
            Add New Record - WeatherStations
          </h5>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              weatherStationName
            </label>
            <input
              onChange={(e) => setNewWeatherStationsName(e.target.value)}
              value={newWeatherStationsName}
              type="text"
              placeholder="weatherStationName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              locationTypes
            </label>
            <select
              onChange={(e) => setNewLocationType(e.target.value)}
              value={newLocationType}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            >
              <option></option>
              {locationTypesList
                ? locationTypesList.map((x: any) => (
                    <option key={x._id} value={x._id}>
                      {x.locationTypesName}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              location
            </label>
            <input
              onChange={(e) => setNewLocation(e.target.value)}
              value={newLocation}
              type="text"
              placeholder="location"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              countries
            </label>
            <select
              onChange={(e) => setNewCountry(e.target.value)}
              value={newCountry}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            >
              <option></option>
              {countriesList
                ? countriesList.map((x: any) => (
                    <option key={x._id} value={x._id}>
                      {x.countriesName}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              regions
            </label>
            <select
              onChange={(e) => setNewRegion(e.target.value)}
              value={newRegion}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            >
              <option></option>
              {regionsList
                ? regionsList.map((x: any) => (
                    <option key={x._id} value={x._id}>
                      {x.regionsName}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              districts
            </label>
            <select
              onChange={(e) => setNewDistrict(e.target.value)}
              value={newDistrict}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            >
              <option></option>
              {districtsList
                ? districtsList.map((x: any) => (
                    <option key={x._id} value={x._id}>
                      {x.districtsName}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              dateOfInstallation
            </label>
            <input
              onChange={(e) => setNewDateOfInstallation(e.target.value)}
              value={newDateOfInstallation}
              type="text"
              placeholder="dateOfInstallation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              operators
            </label>
            <select
              onChange={(e) => setNewOperator(e.target.value)}
              value={newOperator}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            >
              <option></option>
              {operatorsList
                ? operatorsList.map((x: any) => (
                    <option key={x._id} value={x._id}>
                      {x.operatorsName}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              dataFrequency
            </label>
            <input
              onChange={(e) => setNewDataFrequency(e.target.value)}
              value={newDataFrequency}
              type="text"
              placeholder="dataFrequency"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              stationStatus
            </label>
            <input
              onChange={(e) => setNewStationStatus(e.target.value)}
              value={newStationStatus}
              type="text"
              placeholder="stationStatus"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              observedParameters
            </label>
            <input
              onChange={(e) => setNewObservedParameters(e.target.value)}
              value={newObservedParameters}
              type="text"
              placeholder="observedParameters"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              accuracyLevel
            </label>
            <input
              onChange={(e) => setNewAccuracyLevel(e.target.value)}
              value={newAccuracyLevel}
              type="number"
              placeholder="accuracyLevel"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              communicationSystem
            </label>
            <input
              onChange={(e) => setNewCommunicationSystem(e.target.value)}
              value={newCommunicationSystem}
              type="text"
              placeholder="communicationSystem"
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
              pattern="^\d*(\.\d{0,2})?$"
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
              pattern="^\d*(\.\d{0,2})?$"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              elevation
            </label>
            <input
              onChange={(e) => setNewElevation(e.target.value)}
              value={newElevation}
              type="number"
              placeholder="elevation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              stationsNatures
            </label>
            <select
              onChange={(e) => setNewStationsNatures(e.target.value)}
              value={newStationsNatures}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            >
              <option></option>
              {stationsNaturesList
                ? stationsNaturesList.map((x: any) => (
                    <option key={x._id} value={x._id}>
                      {x.stationsNaturesName}
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

// "use client";

// import { useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { getAPIDATA, getAPIUPDATEPATH } from "@/lib/functions";

// const DataBaseTable = "GeoLocations";
// export default function EditGeoLocations({
//   id,
//   shortCode,
//   geoLocationsName,
//   latitude,
//   longitude,
//   category,
// }: any) {
//   const [newShortCode, setNewShortCode] = useState(shortCode);
//   const [newGeoLocationsName, setNewGeoLocationsName] =
//     useState(geoLocationsName);
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
//           newGeoLocationsName,
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
//             GeoLocationsName
//           </label>
//           <input
//             onChange={(e) => setNewGeoLocationsName(e.target.value)}
//             value={newGeoLocationsName}
//             type="text"
//             placeholder="GeoLocationsName"
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
