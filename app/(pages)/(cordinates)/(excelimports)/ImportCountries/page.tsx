import React from "react";
//import { GETAll } from "@/src/Actions/ApiCalls/apiActions";
import ImportCountries from "@/src/components/ExcelFiles/ImportCountries";

//const DataBaseTable: string = "Countries";

export default async function CountriesCordinatesImports() {
  //const recQuery = (await GETAll(DataBaseTable)) || [];
  return (
    <main className="min-h-screen max-w-4xl mx-auto">
      {/* <Import Countries regions={recQuery} /> */}
      <ImportCountries />
    </main>
  );
}
