import EditOperators from "@/src/components/Operators/Edit";
import { GETDATABYiDs } from "@/src/lib/apiActions";

const DataBaseTable = "Operators";

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
 const id = (await params).id;
  const tableiD: string = id;
  const { Operators } = await GETDATABYiDs(tableiD, DataBaseTable);
  const { operatorsName } = Operators;

  return <EditOperators id={id} operatorsName={operatorsName} />;
}
