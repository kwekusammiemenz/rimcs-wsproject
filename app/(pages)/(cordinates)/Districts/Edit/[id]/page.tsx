import EditDistricts from "@/src/components/Districts/Edit";
import { GETDATABYiDs } from "@/src/lib/apiActions";

const DataBaseTable = "Districts";

export default async function Edit({ params }: { params: Promise<{ id: string }> }) {
 const id = (await params).id;
  const tableiD: string = id;
  const { Districts } = await GETDATABYiDs(tableiD, DataBaseTable);
  const { districtsName, latitude, longitude, region } = Districts;

  return (
    <EditDistricts
      id={id}
      districtsName={districtsName}
      latitude={latitude}
      longitude={longitude}
      region={region._id}
    />
  );
}
