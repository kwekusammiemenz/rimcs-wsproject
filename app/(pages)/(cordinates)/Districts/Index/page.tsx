import { DeleteButton, EditButton } from "@/src/components/ActionButtons";
import { GETAll } from "@/src/Actions/ApiCalls/apiActions";

const DataBaseTable: string = "Districts";
const countriesDataBaseTable: string = "Regions";

const DistrictsIndexPage = async () => {
  const data = await GETAll(DataBaseTable);
  const subData = await GETAll(countriesDataBaseTable);

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
              ? data.map((x: any) => {
                {
                  return subData
                    ? subData.map((c: any) => {
                      if (x.region === c._id) {
                        return (
                          <>
                            <article
                              key={x._id}
                              className="flex max-w-xl flex-col items-start justify-between"
                            >
                              <div className="group relative">
                                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                  <span className="absolute inset-0"></span>
                                  {x.districtsName}
                                </h3>
                              </div>
                              <div className="relative mt-4 flex items-center gap-x-4">
                                <div className="text-sm/6">
                                  <p className="font-semibold text-gray-900">
                                    <span className="absolute inset-0"></span>
                                    cordinate: ({x.latitude}, {x.longitude})
                                  </p>
                                  <p className="text-gray-600">
                                    <strong>
                                      <small>
                                        {c.regionsName}
                                        {/* {" / "}
                                            {c.countriesCode} */}
                                      </small>
                                    </strong>
                                  </p>
                                </div>
                              </div>
                              <div className="flex mt-4 md:mt-6">
                                <EditButton
                                  tableName={DataBaseTable}
                                  id={x._id}
                                />
                                <DeleteButton
                                  tableName={DataBaseTable}
                                  id={x._id}
                                />
                              </div>
                            </article>
                          </>
                        );
                      }
                    })
                    : null;
                }
              })
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default DistrictsIndexPage;
