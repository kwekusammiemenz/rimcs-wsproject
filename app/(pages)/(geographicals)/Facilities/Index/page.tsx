import { DeleteButton, EditButton } from "@/src/components/ActionButtons";
import { GETAll } from "@/src/Actions/ApiCalls/apiActions";

const PageTitle: string = "Facilities";
const DataBaseTable: string = "WeatherStations";

const WeatherStationsIndexPage = async () => {
  const data = await GETAll(DataBaseTable);

  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              From the - {PageTitle}
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
                    className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                        {x.weatherStationsName}
                      </h5>
                    </div>
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="divide-y divide-gray-200 dark:divide-gray-700"
                      >
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                location
                              </p>
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {x.location}
                              </p>
                            </div>
                          </div>
                        </li>
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center ">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                accuracyLevel
                              </p>
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {x.accuracyLevel}
                              </p>
                            </div>
                          </div>
                        </li>
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                elevation
                              </p>
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {x.elevation}
                              </p>
                            </div>
                          </div>
                        </li>
                        <li className="py-3 sm:py-4">
                          <div className="flex items-center ">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Cordinate
                              </p>
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                ({x.latitude}
                                {", "}
                                {x.longitude})
                              </p>
                            </div>
                          </div>
                        </li>
                        <li className="pt-3 pb-0 sm:pt-4">
                          <div className="flex items-center ">
                            <div className="flex-1 min-w-0 ms-4">
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                stationStatus
                              </p>
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {x.stationStatus}
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="flex mt-4 md:mt-6">
                      <EditButton tableName={DataBaseTable} id={x._id} />
                      <DeleteButton tableName={DataBaseTable} id={x._id} />
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

export default WeatherStationsIndexPage;
