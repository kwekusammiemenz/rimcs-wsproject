/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
"use client";

import { GETAll } from "@/src/lib/apiActions";
//Map component Component from library
import { GoogleMap, InfoWindow, InfoWindowF, Marker, MarkerF } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

const DataBaseTable = "WeatherStations";
const MapIconsTable = "MapIcons";


//Map's styling
const defaultMapContainerStyle = {
  width: "100%",
  height: "100vh",
  //borderRadius: "15px 0px 0px 15px",
};

//K2's coordinates
const defaultMapCenter = {
  lat: 7.946527,
  lng: -1.023194,
};

//Default zoom level, can be adjusted
const defaultMapZoom = 18;

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

  const [selectedPlace, setSelectedPlace] = useState([]);

  useEffect(() => {
    const getCordinates = async () => {
      setWeatherStations(await GETAll(DataBaseTable));
      setMapIcons(await GETAll(MapIconsTable));
    };
    getCordinates();
  }, []);

  let featureLayer;
  let infoWindow;
  let lastInteractedFeatureIds = [];
  let lastClickedFeatureIds = [];

  // async function createInfoWindow(event: any) {
  //   let feature = event.features[0];
  //   if (!feature.placeId) return;

  //   // Update the infowindow.
  //   const place = await feature.fetchPlace();
  //   let content =
  //       '<span style="font-size:small">Display name: ' + place.displayName +
  //       '<br/> Place ID: ' + feature.placeId +
  //       '<br/> Feature type: ' + feature.featureType + '</span>';

  //   updateInfoWindow(content, event.latLng);
  // }

  // // Helper function to create an info window.
  // function updateInfoWindow(content: string, center: any) {
  //   infoWindow.setContent(content);
  //   infoWindow.setPosition(center);
  //   infoWindow.open({
  //     Map,
  //     shouldFocus: false,
  //   });
  // }

  function handleClick(e: any) {
    console.log(e.location);
  }

  return (
    <div className="w-full">
      {/* <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}
            >
              <Marker position={{ lat: Number("35.8799866"), lng: Number("76.5048004") }} />
              <InfoWindow />
            </GoogleMap> */}

      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={8}
        //options={defaultMapOptions}
      >
        {weatherStations
          ? weatherStations.map((x: any, index) => {
              return (
                <MarkerF
                  key={index}
                  title={x.weatherStationsName}
                  position={{
                    lat: Number(x.latitude),
                    lng: Number(x.longitude),
                  }}
                  onClick={(e)=>{
                    // x === selectedPlace ? setSelectedPlace(null):setSelectedPlace(x);
                    console.log(e)
                  }}

                  // key={index}
                  // title={x.weatherStationsName}
                  // position={{
                  //   lat: Number(x.latitude),
                  //   lng: Number(x.longitude),
                  // }}
                  // onClick={() => handleClick(x)}

                  // onClick={(props: any, marker: React.SetStateAction<null>) => {
                  //   setSelectedElement(x);
                  //   setActiveMarker(marker);
                  // }}
                />
              );
            })
          : null}
       {/*   {selectedPlace &&(
          <InfoWindowF
          position={{
                    lat: selectedPlace.latitude,
                    lng: selectedPlace.longitude,
                  }}
                  zIndex={1}
                  options={{pixelOffset:{
                    width: 0, height: -40,
                    equals: function (other: google.maps.Size | null): boolean {
                      throw new Error("Function not implemented.");
                    }
                  }}}
                  onCloseClick={()=>setSelectedPlace(undefined)}
                  >
                    <div>
                      <h3>{selectedPlace.weatherStationsName}</h3>
                    </div>
                  </InfoWindowF>
        )}
         */}
        
        
        
        
        
        {/* {selectedElement
          ? selectedElement.map((x: any) => {
              return (
                <>
                  <InfoWindow
                    //visible={showInfoWindow}
                    //marker={activeMarker}
                    onCloseClick={() => {
                      setSelectedElement([]);
                    }}
                  >
                    <div>
                      <h1>{x.weatherStationsName}</h1>
                    </div>
                  </InfoWindow>
                </>
              );
            })
          : null} */}





      </GoogleMap>
    </div>
  );
};

export { MapComponent };
