import { Navbar } from "@/src/components/Navbar";
import LocationTypesIndexPage from "./Index/page";

const DataBaseTable = "LocationTypes";

export default function Countries() {
  return (
    <>
      <Navbar uri={`/${DataBaseTable}/Create`} />
      <LocationTypesIndexPage />
    </>
  );
}
