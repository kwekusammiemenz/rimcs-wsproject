import { Navbar } from "@/src/components/Navbar";
import StationsNaturesIndexPage from "./Index/page";

const DataBaseTable = "StationsNatures";

export default function Countries() {
  return (
    <>
      <Navbar uri={`/${DataBaseTable}/Create`} />
      <StationsNaturesIndexPage />
    </>
  );
}
