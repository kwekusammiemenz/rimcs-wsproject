import WeatherStations from "@/app/api/models/weatherstations";
import { dbConnect } from "@/app/api/mongo/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  await dbConnect();

  return await WeatherStations.find()
    // .exec()
    //.populate("locationType")
    // .populate("country")
    // .populate("region")
    // .populate("district")
    // .populate("operator")
    .then((recQuery) =>
      recQuery
        ? new NextResponse(JSON.stringify(recQuery), {
            status: 200,
          })
        : new NextResponse(JSON.stringify({ message: "Not found" }), {
            status: 404,
          })
    )
    .catch(
      (error: any) =>
        new NextResponse(JSON.stringify({ message: error.message }), {
          status: 500,
        })
    );
};

export const POST = async (request: Request) => {
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
    stationsNature,
  } = await request.json();

  await dbConnect();

  const isExist = await WeatherStations.findOne({ weatherStationsName });
  if (isExist) {
    new NextResponse(JSON.stringify({ message: "Record already exists" }), {
      status: 400,
    });
  } else {
    const recQuery = new WeatherStations({
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
      stationsNature
    });

    return recQuery
      .save()
      .then(
        (WeatherStations: any) =>
          new NextResponse(
            JSON.stringify({
              message: "Record Created",
              WeatherStations: WeatherStations,
            }),
            { status: 201 }
          )
      )
      .catch(
        (error: any) =>
          new NextResponse(JSON.stringify({ message: error.message }), {
            status: 500,
          })
      );
  }
};
