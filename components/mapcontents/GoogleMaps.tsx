"use client";

import { GoogleMap, InfoWindowF, MarkerF } from "@react-google-maps/api";
// import { Button, Card } from "flowbite-react";
import React, { SetStateAction, useEffect, useState } from "react";
import { GET_All } from "../apicalls/apiActions";
import Image from "next/image";

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
      setWeatherStations(await GET_All(DataBaseTable));
      setMapIcons(await GET_All(MapIconsTable));
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
                  {/* <div key={x._id} className="card max-w-sm text-center">
                    <ul
                      role="list"
                      className="divide-y divide-gray-200 dark:divide-gray-700"
                    >
                      <li className="py-2 sm:py-3">
                        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                          {x.weatherStationsName}
                        </h5>
                      </li>
                      <li className="py-2 sm:py-3">
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          location
                        </p>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {x.location}
                        </p>
                      </li>
                      <li className="pt-2 pb-0 sm:pt-3">
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

                    <Button>
                      Read more
                      <svg
                        className="-mr-1 ml-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button> 
                  </div> */}



                  <div className="max-w-sm w-full lg:max-w-full lg:flex">                    
                    <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                      <div className="mb-8">
                        <p className="text-sm text-gray-600 flex items-center">
                          <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                          </svg>
                          {x.stationStatus}
                        </p>
                        <div className="text-gray-900 font-bold text-lg mb-2">{x.weatherStationsName}</div>
                        {/* <p className="text-gray-700 text-base">{x.location}</p> */}
                      </div>
                      <div className="flex items-center">                       
                        <div className="text-sm">
                          <p className="text-gray-900 leading-none"><b><i>Location: {x.location}</i></b></p>
                          {/* <p className="text-gray-600">{x.stationStatus}</p> */}
                        </div>
                      </div>
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
