import { NextResponse } from "next/server";
import Districts from "@/app/api/models/districts";
import { dbConnect } from "@/app/api/mongo/mongodb";

export const GET = async () => {
  await dbConnect();

  return await Districts.find()
    //.populate("region")
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
  const { districtsName, latitude, longitude, region } = await request.json();

  await dbConnect();

  const isExist = await Districts.findOne({ districtsName });
  if (isExist) {
    new NextResponse(JSON.stringify({ message: "Record already exists" }), {
      status: 400,
    });
  } else {
    const recQuery = new Districts({
      districtsName,
      latitude,
      longitude,
      region,
    });

    return recQuery
      .save()
      .then(
        (Categories: any) =>
          new NextResponse(
            JSON.stringify({
              message: "Record Created",
              Categories: Categories,
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
