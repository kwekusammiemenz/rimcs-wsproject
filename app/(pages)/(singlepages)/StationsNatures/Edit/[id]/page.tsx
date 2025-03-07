import EditStationsNatures from "@/src/components/StationsNatures/Edit";
import { GETDATABYiDs } from "@/src/Actions/ApiCalls/apiActions";

const DataBaseTable = "StationsNatures";

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const tableiD: string = id;
  const { StationsNatures } = await GETDATABYiDs(tableiD, DataBaseTable);
  const { stationsNaturesName } = StationsNatures;

  return <EditStationsNatures id={id} stationsNaturesName={stationsNaturesName} />;
}
