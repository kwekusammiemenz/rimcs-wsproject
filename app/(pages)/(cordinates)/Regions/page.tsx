
import { Navbar } from "@/src/components/Navbar";
import RegionsIndexPage from "./Index/page";

export default function Regions() {
  return (
    <>
      <Navbar uri={"/Regions/Create"} />
      <RegionsIndexPage />
    </>
  );
}
