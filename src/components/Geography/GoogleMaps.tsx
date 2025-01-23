
"use client";

import { GETAll } from "@/src/Actions/ApiCalls/apiActions";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
} from "@react-google-maps/api";
import React, { SetStateAction, useEffect, useState } from "react";

const DataBaseTable = "WeatherStations";
const MapIconsTable = "MapIcons";

const defaultMapContainerStyle = {
  width: "100%",
  height: "100vh",
  //borderRadius: "15px 0px 0px 15px",
};

// Ghana's coordinates
const defaultMapCenter = {
  lat: 7.946527,
  lng: -1.023194,
};


//Map options
const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "satellite",
};

const MapComponent = () => {
  const [weatherStations, setWeatherStations] = useState([]);
  const [mapIcons, setMapIcons] = useState([]);

  const [selectedPlace, setSelectedPlace] = useState<any[]>([]);

  useEffect(() => {
    const getCordinates = async () => {
      setWeatherStations(await GETAll(DataBaseTable));
      setMapIcons(await GETAll(MapIconsTable));
    };
    getCordinates();
  }, []);

  function handleClick(selectedData: any) {
    setSelectedPlace([selectedData]);
  }

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={7}
        //options={defaultMapOptions}
      >
        {weatherStations
          ? weatherStations.map((x: any) => {
              return mapIcons
                ? mapIcons.map((c: any) => {
                    if (x.operator === c.operator) {
                      {
                        return (
                          <MarkerF
                            key={x._id}
                            title={x.weatherStationsName}
                            position={{
                              lat: Number(x.latitude),
                              lng: Number(x.longitude),
                            }}
                            onClick={() => {
                              handleClick(x);
                            }}
                            icon={c.mapIconsName}
                          />
                        );
                      }
                    }
                  })
                : null;
            })
          : null}

        {selectedPlace
          ? selectedPlace.map((x: any) => {
              return (
                <InfoWindowF
                  key={x._id}
                  position={{
                    lat: Number(x.latitude),
                    lng: Number(x.longitude),
                  }}
                  zIndex={1}
                  options={{
                    pixelOffset: {
                      width: 0,
                      height: -40,
                      equals: function (
                        other: google.maps.Size | null
                      ): boolean {
                        throw new Error("Function not implemented.");
                      },
                    },
                  }}
                  onCloseClick={() => setSelectedPlace([])}
                >
                  <div
                    key={x._id}
                    className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                        {x.weatherStationsName}
                      </h5>
                    </div>
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="divide-y divide-gray-200 dark:divide-gray-700"
                      >
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                location
                              </p>
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {x.location}
                              </p>
                            </div>
                          </div>
                        </li>
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center ">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                accuracyLevel
                              </p>
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {x.accuracyLevel}
                              </p>
                            </div>
                          </div>
                        </li>
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                elevation
                              </p>
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {x.elevation}
                              </p>
                            </div>
                          </div>
                        </li>
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center ">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Cordinate
                              </p>
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                ({x.latitude}
                                {", "}
                                {x.longitude})
                              </p>
                            </div>
                          </div>
                        </li>
                        <li className="pt-3 pb-0 sm:pt-4">
                          <div className="flex items-center ">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                stationStatus
                              </p>
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {x.stationStatus}
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </InfoWindowF>
              );
            })
          : null}
      </GoogleMap>
    </div>
  );
};

export { MapComponent };
