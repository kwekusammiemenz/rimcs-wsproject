import EditMapIcons from "@/src/components/MapIcons/Edit";
import { GETDATABYiDs } from "@/src/Actions/ApiCalls/apiActions";

const DataBaseTable = "MapIcons";

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const tableiD: string = id;
  const { MapIcons } = await GETDATABYiDs(tableiD, DataBaseTable);
  const { mapIconsName, operator } = MapIcons;

  return (
    <EditMapIcons id={id} mapIconsName={mapIconsName} operator={operator._id} />
  );
}
