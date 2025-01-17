import EditLocationTypes from "@/src/components/LocationTypes/Edit";
import { GETDATABYiDs } from "@/src/lib/apiActions";

const DataBaseTable = "LocationTypes";

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
 const id = (await params).id;
  const tableiD: string = id;
  const { LocationTypes } = await GETDATABYiDs(tableiD, DataBaseTable);
  const { locationTypesName } = LocationTypes;

  return <EditLocationTypes id={id} locationTypesName={locationTypesName} />;
}
