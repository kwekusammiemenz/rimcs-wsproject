import { delay } from "@/src/lib/utils";


export default async function ComponentsPage() {
  await delay(1000);
  return (
    <div>
      <h1 className="text-3xl font-bold">Components</h1>
    </div>
  );
}
