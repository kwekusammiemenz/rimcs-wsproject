import { DeleteButton, EditButton } from "@/src/components/ActionButtons";
import { GETAll } from "@/src/Actions/ApiCalls/apiActions";

const DataBaseTable: string = "Countries";

const CountriesIndexPage = async () => {
  const data = await GETAll(DataBaseTable);

  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              From the {DataBaseTable}
            </h2>
            <p className="mt-2 text-lg/8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {data
              ? data.map((x: any) => (
                <article
                  key={x._id}
                  className="flex max-w-xl flex-col items-start justify-between"
                >
                  <div className="group relative">
                    <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                      <span className="absolute inset-0"></span>
                      {x.countriesName}
                    </h3>
                  </div>
                  <div className="relative mt-4 flex items-center gap-x-4">
                    <div className="text-sm/6">
                      <p className="font-semibold text-gray-900">
                        <span className="absolute inset-0"></span>
                        cordinate: ({x.latitude}, {x.longitude})
                      </p>
                      <p className="text-gray-600">
                        <strong>{x.countriesCode}</strong>
                      </p>
                      {/* <div className="flex items-center gap-x-4 text-xs">
                          <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                            {x.description}
                          </div>
                        </div> */}
                    </div>
                  </div>
                  <div className="flex mt-4 md:mt-6">
                    <EditButton tableName={DataBaseTable} id={x._id} />
                    <DeleteButton tableName={DataBaseTable} id={x._id} />
                  </div>
                </article>
              ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default CountriesIndexPage;
