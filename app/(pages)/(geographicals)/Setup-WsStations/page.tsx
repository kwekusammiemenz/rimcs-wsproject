import { delay } from "@/src/lib/utils";

export default async function GeographicalsPage() {
  await delay(1000);
  return (
    <div>
      <h1 className="text-3xl font-bold">Geographicals</h1>
    </div>
  );
}
