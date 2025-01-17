import { Navbar } from "@/src/components/Navbar";
import OperatorsIndexPage from "./Index/page";

const DataBaseTable = "Operators";

export default function Countries() {
  return (
    <>
      <Navbar uri={`/${DataBaseTable}/Create`} />
      <OperatorsIndexPage />
    </>
  );
}
