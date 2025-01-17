import { delay } from "@/src/lib/utils";



export default async function setCordinatesPage() {
  await delay(1000);
  return (
    <div>
      <h1 className="text-3xl font-bold">Locations Cordinates</h1>
    </div>
  );
}
