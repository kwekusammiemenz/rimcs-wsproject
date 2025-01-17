import { DeleteButton, EditButton } from "@/src/components/ActionButtons";
import { GETAll } from "@/src/lib/apiActions";
import Image from "next/image";

const DataBaseTable: string = "MapIcons";

const Index = async () => {
  const data = await GETAll(DataBaseTable);

  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              From the MapIcons
            </h2>
            <p className="mt-2 text-lg/8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {data
              ? data.map((x: any) => (
                  <div
                    key={x._id}
                    className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                    <div className="flex  flex-col items-center pb-10 px-4 pt-5">
                      <h5 className="mb-1 text-xl text-center font-medium text-gray-900 dark:text-white">
                        <Image
                          src={x.mapIconsName}
                          height={200}
                          width={200}
                          alt="mapicon"
                        ></Image>
                      </h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        <small>Operator:</small>
                        <br /> <strong>{x.operator.operatorsName}</strong>
                      </span>
                      <div className="flex mt-4 md:mt-6">
                        <EditButton tableName={DataBaseTable} id={x._id} />
                        <DeleteButton tableName={DataBaseTable} id={x._id} />
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
