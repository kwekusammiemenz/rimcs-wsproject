import WeatherStations from "@/app/api/models/weatherstations";
import { dbConnect } from "@/app/api/mongo/mongodb";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;

  await dbConnect();

  return await WeatherStations.findOne({ _id: id })
    // .populate("locationType")
    // .populate("country")
    // .populate("region")
    // .populate("district")
    // .populate("operator")
    // .select("-__v")
    .then((recQuery) =>
      recQuery
        ? new NextResponse(
            JSON.stringify({
              message: "Record Found",
              WeatherStations: recQuery,
            }),
            {
              status: 200,
            }
          )
        : new NextResponse(JSON.stringify({ message: "Not found" }), {
            status: 404,
          })
    )
    .catch((error) => NextResponse.json({ error }, { status: 500 }));
};

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;
  const body = await request.json();
  const {
    newWeatherStationsName: weatherStationsName,
    newLocationType: locationType,
    newLocation: location,
    newCountry: country,
    newRegion: region,
    newDistrict: district,
    newDateOfInstallation: dateOfInstallation,
    newOperator: operator,
    newDataFrequency: dataFrequency,
    newStationStatus: stationStatus,
    newObservedParameters: observedParameters,
    newAccuracyLevel: accuracyLevel,
    newCommunicationSystem: communicationSystem,
    newLatitude: latitude,
    newLongitude: longitude,
    newElevation: elevation,
    newStationsNature: stationsNature,
  } = body;

  await dbConnect();

  return WeatherStations.findByIdAndUpdate(
    id,
    {
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
    },
    { new: true }
  )
    .then((recQuery) => {
      if (recQuery) {
        recQuery.set(body);
        return recQuery
          .save()
          .then(
            (WeatherStations: any) =>
              new NextResponse(
                JSON.stringify({
                  message: "Record updated",
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
      } else {
        new NextResponse(JSON.stringify({ message: "Not found" }), {
          status: 404,
        });
      }
    })
    .catch(
      (error: any) =>
        new NextResponse(JSON.stringify({ message: error.message }), {
          status: 500,
        })
    );
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;

  await dbConnect();

  return await WeatherStations.findByIdAndDelete(id)
    .then((WeatherStations) =>
      WeatherStations
        ? new NextResponse(JSON.stringify({ message: "Record Deleted" }), {
            status: 200,
          })
        : new NextResponse(JSON.stringify({ message: "Record Not found" }), {
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
