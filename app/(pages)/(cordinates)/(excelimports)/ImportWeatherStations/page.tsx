import React from "react";
import ImportWeatherStations from "@/src/components/ExcelFiles/ImportWeatherStations";

export default async function WeatherStationsCordinatesImports() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto">
      <ImportWeatherStations />
    </main>
  );
}
