import EditRegions from "@/src/components/Regions/Edit";
import { GETDATABYiDs } from "@/src/lib/apiActions";

const DataBaseTable = "Regions";

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
 const id = (await params).id;
  const tableiD: string = id;
  const { Regions } = await GETDATABYiDs(tableiD, DataBaseTable);
  const { regionsName, latitude, longitude, country } = Regions;

  return (
    <EditRegions
      id={id}
      regionsName={regionsName}
      latitude={latitude}
      longitude={longitude}
      country={country._id}
    />
  );
}
