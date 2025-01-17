import { Navbar } from "@/src/components/Navbar";
import SponsorsIndexPage from "./Index/page";

export default function Countries() {
  return (
    <>
      <Navbar uri={"/Sponsors/Create"} />
      <SponsorsIndexPage />
    </>
  );
}
