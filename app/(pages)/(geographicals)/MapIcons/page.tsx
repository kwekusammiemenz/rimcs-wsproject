import { Navbar } from "@/src/components/Navbar";
import MapIconsIndexPage from "./Index/page";

export default function MapIcons() {
  return (
    <>
      <Navbar uri={"/MapIcons/Create"} />
      <MapIconsIndexPage />
    </>
  );
}
