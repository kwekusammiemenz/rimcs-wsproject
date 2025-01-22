import LocationTypes from "@/app/api/models/locationtypes";
import EditWeatherStations from "@/src/components/WeatherStations/Edit";
import { GETDATABYiDs } from "@/src/Actions/ApiCalls/apiActions";

const DataBaseTable = "WeatherStations";

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const tableiD: string = id;
  const { WeatherStations } = await GETDATABYiDs(tableiD, DataBaseTable);
  const {
    weatherStationsName,
    locationType,
    location,
    country,
    region,
    district,
    dateOfInstallation,
    operator,
    dataFrequency,
    stationStatus,
    observedParameters,
    accuracyLevel,
    communicationSystem,
    latitude,
    longitude,
    elevation,
  } = WeatherStations;

  return (
    <EditWeatherStations
      id={id}
      weatherStationsName={weatherStationsName}
      locationType={locationType}
      location={location}
      country={country}
      region={region}
      district={district}
      dateOfInstallation={dateOfInstallation}
      operator={operator}
      dataFrequency={dataFrequency}
      stationStatus={stationStatus}
      observedParameters={observedParameters}
      accuracyLevel={accuracyLevel}
      communicationSystem={communicationSystem}
      latitude={latitude}
      longitude={longitude}
      elevation={elevation}
    />
  );
}
