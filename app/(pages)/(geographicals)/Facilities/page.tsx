import { Navbar } from "@/src/components/Navbar";
import WeatherStationsIndexPage from "./Index/page";

export default function WeatherStations() {
  return (
    <>
      <Navbar uri={"/WeatherStations/Create"} />
      <WeatherStationsIndexPage />
    </>
  );
}
