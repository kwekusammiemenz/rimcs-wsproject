import EditSponsors from "@/src/components/Sponsors/Edit";
import { GETDATABYiDs } from "@/src/lib/apiActions";

const DataBaseTable = "Sponsors";

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const tableiD: string = id;
  const { Sponsors } = await GETDATABYiDs(tableiD, DataBaseTable);
  const { sponsorsName } = Sponsors;

  return <EditSponsors id={id} sponsorsName={sponsorsName} />;
}
