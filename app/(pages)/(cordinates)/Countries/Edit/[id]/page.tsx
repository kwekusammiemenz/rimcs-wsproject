import EditCountries from "@/src/components/Countries/Edit";
import { GETDATABYiDs } from "@/src/Actions/ApiCalls/apiActions";

const DataBaseTable = "Countries";

export default async function Edit({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const tableiD: string = id;
  const { Countries } = await GETDATABYiDs(tableiD, DataBaseTable);
  const { countriesCode, countriesName, latitude, longitude } = Countries;

  return (
    <EditCountries
      id={id}
      countriesCode={countriesCode}
      countriesName={countriesName}
      latitude={latitude}
      longitude={longitude}
    />
  );
}
