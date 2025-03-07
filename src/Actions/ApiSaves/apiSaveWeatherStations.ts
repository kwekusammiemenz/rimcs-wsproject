import {
  CountriesProps,
  DistrictsProps,
  LocationTypesProps,
  OperatorsProps,
  RegionsProps,
  StationsNaturesProps,
  WeatherStationsProps,
} from "@/src/Types/DataTypesProps";
import { getAPIDATA } from "../ApiCalls/apiActions";

//const DataBaseTable = "WeatherStations";

export const createBulkWeatherStations = async (
  weatherStations: WeatherStationsProps[],
  countries: CountriesProps[],
  regions: RegionsProps[],
  districts: DistrictsProps[],
  locationTypes: LocationTypesProps[],
  operators: OperatorsProps[],
  stationsNatures: StationsNaturesProps[],
  DataBaseTable: string
) => {
  let recRes: boolean = false;
  try {
    for (const recQuery of weatherStations) {
      for (const countriesQuery of countries) {
        if (
          countriesQuery.countriesName
            .toLowerCase()
            .includes(recQuery.country.toLowerCase())
        ) {
          for (const regionsQuery of regions) {
            if (
              regionsQuery.regionsName
                .toLowerCase()
                .includes(recQuery.region.toLowerCase())
            ) {
              for (const districtsQuery of districts) {
                if (
                  districtsQuery.districtsName
                    .toLowerCase()
                    .includes(recQuery.district.toLowerCase())
                ) {
                  for (const locationTypesQuery of locationTypes) {
                    if (
                      locationTypesQuery.locationTypesName
                        .toLowerCase()
                        .includes(recQuery.locationType.toLowerCase())
                    ) {
                      for (const operatorsQuery of operators) {
                        if (
                          operatorsQuery.operatorsName
                            .toLowerCase()
                            .includes(recQuery.operator.toLowerCase())
                        ) {
                          for (const stationsNaturesQuery of stationsNatures) {
                            if (
                              stationsNaturesQuery.stationsNaturesName
                                .toLowerCase()
                                .includes(recQuery.stationsNature.toLowerCase())
                            ) {
                              const res = await fetch(
                                getAPIDATA(DataBaseTable),
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    weatherStationsName:
                                      recQuery.weatherStationsName,
                                    locationType: locationTypesQuery._id,
                                    location: recQuery.location,
                                    country: countriesQuery._id,
                                    region: regionsQuery._id,
                                    district: districtsQuery._id,
                                    dateOfInstallation:
                                      recQuery.dateOfInstallation,
                                    operator: operatorsQuery._id,
                                    dataFrequency: recQuery.dataFrequency,
                                    stationStatus: recQuery.stationStatus,
                                    observedParameters:
                                      recQuery.observedParameters,
                                    accuracyLevel: recQuery.accuracyLevel,
                                    communicationSystem:
                                      recQuery.communicationSystem,
                                    latitude: recQuery.latitude,
                                    longitude: recQuery.longitude,
                                    elevation: recQuery.elevation,
                                    stationsNature: stationsNaturesQuery._id,
                                  }),
                                }
                              );
                              recRes = true;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    recRes = false;
    console.log(error);
  }
  return recRes;
};

export const createWeatherStations = async (
  data: WeatherStationsProps,
  DataBaseTable: string
) => {
  try {
    //const router = useRouter();
    console.log(data);
    const res = await fetch(getAPIDATA(DataBaseTable), {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        weatherStationsName: data.weatherStationsName,
        locationType: data.locationType,
        location: data.location,
        country: data.country,
        region: data.region,
        district: data.district,
        dateOfInstallation: data.dateOfInstallation,
        operator: data.operator,
        dataFrequency: data.dataFrequency,
        stationStatus: data.stationStatus,
        observedParameters: data.observedParameters,
        accuracyLevel: data.accuracyLevel,
        communicationSystem: data.communicationSystem,
        latitude: data.latitude,
        longitude: data.longitude,
        elevation: data.elevation,
        stationsNature: data.stationsNature,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to update record");
    }

    //router.refresh();
    //router.push(`/${DataBaseTable}`);

    // // const user = await prisma.user.create({
    // //   data: {
    // //     districtsName: data.districtsName,
    // //     latitude: data.latitude,
    // //     longitude: data.longitude,
    // //     region: data.region,
    // //   },
    // // });
    // // revalidatePath("/");
    // // return user;
  } catch (error) {
    console.log(error);
  }
};
