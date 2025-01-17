import { Navbar } from "@/src/components/Navbar";
import DistrictsIndexPage from "./Index/page";

export default function GeoLocation() {
  return (
    <>
      <Navbar uri={"/Districts/Create"} />
      <DistrictsIndexPage />
    </>
  );
}
