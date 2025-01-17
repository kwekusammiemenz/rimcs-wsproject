// "use client";

// import { GETAll } from "@/src/lib/apiActions";
// //Map component Component from library
// import { GoogleMap, Marker } from "@react-google-maps/api";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// const DataBaseTable = "WeatherStations";
// const MapIconsTable = "MapIcons";

// function buildMapInfoContent(title: string, body: string) {
//   return `
//    <div className="map_infocard_content">
//     <div className="map_infocard_title">${title}</div>
//     <div className="map_infocard_body">${body}</div>
//    </div>
//    `;
// }

// //Map's styling
// const defaultMapContainerStyle = {
//   width: "100%",
//   height: "95vh",
//   //borderRadius: "15px 0px 0px 15px",
// };

// //K2's coordinates set to Ghana
// const defaultMapCenter = {
//   ////lat: 35.8799866,
//   ////lng: 76.5048004

//   lat: 7.946527,
//   lng: -1.023194,
// };

// //Default zoom level, can be adjusted
// //const defaultMapZoom = 18
// const defaultMapZoom = 7.5;

// //Map options
// const defaultMapOptions = {
//   zoomControl: true,
//   tilt: 0,
//   gestureHandling: "auto",
//   //mapTypeId: 'satellite',
//   mapTypeId: "hybrid",
// };

// const pinIcon = {
//   url: "/public/profile.png",
//   scaledSize: { width: 50, height: 50 },
// };

// const MapComponent = () => {
//   const [weatherStations, setWeatherStations] = useState([]);
//   const [mapIcons, setMapIcons] = useState([]);
//   useEffect(() => {
//     const getCordinates = async () => {
//       setWeatherStations(await GETAll(DataBaseTable));
//       setMapIcons(await GETAll(MapIconsTable));
//     };
//     getCordinates();
//   }, []);

//   const infoCard = new google.maps.InfoWindow({
//     position: defaultMapCenter,
//     content: buildMapInfoContent("name", "name"),
//     maxWidth: 200,
//   });

//   return (
//     <>
//       {mapIcons
//         ? mapIcons.map((x: any) => {
//             return (
//               <>
//                 <li>
//                   {x._id}
//                   <Image
//                     src={x.mapIconsName}
//                     height={50}
//                     width={50}
//                     alt="mapicon"
//                   ></Image>
//                 </li>
//               </>
//             );
//           })
//         : null}

//       <div className="w-full">
//         <GoogleMap
//           mapContainerStyle={defaultMapContainerStyle}
//           center={defaultMapCenter}
//           zoom={defaultMapZoom}
//           options={defaultMapOptions}
//         >
          



//           {weatherStations?.map((x: any, index) => {
//             return (
//               <Marker
//                 key={index}
//                 position={{ lat: Number(x.latitude), lng: Number(x.longitude) }}
                

//                 //   icon={L.divIcon({
//                 //             iconSize: [size, size],
//                 //             iconAnchor: [size / 2, size + 9],
//                 //             className: "mymarker",
//                 //             html: "😁",
//                 //         })}
//               />
//             );
//           })}
//         </GoogleMap>
//       </div>
//     </>
//   );
// };

// export { MapComponent };
