import LocationTypes from "@/app/api/models/locationtypes";
import { dbConnect } from "@/app/api/mongo/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  await dbConnect();

  return await LocationTypes.find()
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
  const { locationTypesName } = await request.json();

  await dbConnect();

  const isExist = await LocationTypes.findOne({ locationTypesName });
  if (isExist) {
    new NextResponse(JSON.stringify({ message: "Record already exists" }), {
      status: 400,
    });
  } else {
    const recQuery = new LocationTypes({
      locationTypesName,
    });

    return recQuery
      .save()
      .then(
        (LocationTypes: any) =>
          new NextResponse(
            JSON.stringify({
              message: "Record Created",
              LocationTypes: LocationTypes,
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
