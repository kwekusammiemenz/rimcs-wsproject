import { Navbar } from "@/src/components/Navbar";
import CountriesIndexPage from "./Index/page";

const DataBaseTable = "Countries";

export default function Countries() {
  return (
    <>
      <Navbar uri={`/${DataBaseTable}/Create`} />
      <CountriesIndexPage />
    </>
  );
}
