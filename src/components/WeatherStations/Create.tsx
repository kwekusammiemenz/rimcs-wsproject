"use client";

import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GETAll, getAPIDATA } from "@/src/Actions/ApiCalls/apiActions";

const DataBaseTable = "WeatherStations";
const LocationTypesDropdownDataBaseTable = "LocationTypes";
const CountriesDropdownDataBaseTable = "Countries";
const RegionsDropdownDataBaseTable = "Regions";
const DistrictsDropdownDataBaseTable = "Districts";
const OperatorsDropdownDataBaseTable = "Operators";

export default function CreateWeatherStations() {
  const [weatherStationsName, setWeatherStationsName] = useState("");
  const [locationType, setLocationType] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [dateOfInstallation, setDateOfInstallation] = useState("");
  const [operator, setOperator] = useState("");
  const [dataFrequency, setDataFrequency] = useState("");
  const [stationStatus, setStationStatus] = useState("");
  const [observedParameters, setObservedParameters] = useState("");
  const [accuracyLevel, setAccuracyLevel] = useState("");
  const [communicationSystem, setCommunicationSystem] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [elevation, setElevation] = useState("");

  const [locationTypesList, setLocationTypesList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const [regionsList, setRegionsList] = useState([]);
  const [districtsList, setDistrictsList] = useState([]);
  const [operatorsList, setOperatorsList] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const router = useRouter();

  useEffect(() => {
    const getDropDowns = async () => {
      setLocationTypesList(await GETAll(LocationTypesDropdownDataBaseTable));
      setCountriesList(await GETAll(CountriesDropdownDataBaseTable));
      setRegionsList(await GETAll(RegionsDropdownDataBaseTable));
      setDistrictsList(await GETAll(DistrictsDropdownDataBaseTable));
      setOperatorsList(await GETAll(OperatorsDropdownDataBaseTable));
    };
    getDropDowns();
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
        }),
      });

      if (!res.ok) {
        throw Error(`Failed to create ${DataBaseTable}`);
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

          <div className="grid gap-4 mb-4 md:grid-cols-3">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                weatherStationsName
              </label>
              <input
                onChange={(e) => setWeatherStationsName(e.target.value)}
                value={weatherStationsName}
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
                onChange={(e) => setLocationType(e.target.value)}
                value={locationType}
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
                onChange={(e) => setLocation(e.target.value)}
                value={location}
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
                onChange={(e) => {
                  setCountry(e.target.value);
                  setSelectedCountry(e.target.value);
                }}
                value={country}
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
                onChange={(e) => {
                  setRegion(e.target.value);
                  setSelectedRegion(e.target.value);
                }}
                value={region}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              >
                <option></option>
                {regionsList
                  ? regionsList.map((x: any) => {
                      if (x.country === selectedCountry) {
                        return (
                          <option key={x._id} value={x._id}>
                            {x.regionsName}
                          </option>
                        );
                      }
                    })
                  : null}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                districts
              </label>
              <select
                onChange={(e) => setDistrict(e.target.value)}
                value={district}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              >
                <option></option>
                {districtsList
                  ? districtsList.map((x: any) => {
                      if (x.region === selectedRegion) {
                        return (
                          <option key={x._id} value={x._id}>
                            {x.districtsName}
                          </option>
                        );
                      }
                    })
                  : null}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                dateOfInstallation
              </label>
              <input
                onChange={(e) => setDateOfInstallation(e.target.value)}
                value={dateOfInstallation}
                type="date"
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
                onChange={(e) => setOperator(e.target.value)}
                value={operator}
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
                onChange={(e) => setDataFrequency(e.target.value)}
                value={dataFrequency}
                type="date"
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
                onChange={(e) => setStationStatus(e.target.value)}
                value={stationStatus}
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
                onChange={(e) => setObservedParameters(e.target.value)}
                value={observedParameters}
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
                onChange={(e) => setAccuracyLevel(e.target.value)}
                value={accuracyLevel}
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
                onChange={(e) => setCommunicationSystem(e.target.value)}
                value={communicationSystem}
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
                onChange={(e) => setLatitude(e.target.value)}
                value={latitude}
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
                onChange={(e) => setLongitude(e.target.value)}
                value={longitude}
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
                onChange={(e) => setElevation(e.target.value)}
                value={elevation}
                type="number"
                placeholder="elevation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
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
