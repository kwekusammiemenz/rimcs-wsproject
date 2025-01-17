import { NextResponse } from "next/server";
import Regions from "@/app/api/models/regions";
import { dbConnect } from "@/app/api/mongo/mongodb";

export const GET = async () => {
  await dbConnect();

  return await Regions.find()
    //.populate("country")
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
  const { regionsName, latitude, longitude, country } = await request.json();

  await dbConnect();

  const isExist = await Regions.findOne({ regionsName });
  if (isExist) {
    new NextResponse(JSON.stringify({ message: "Record already exists" }), {
      status: 400,
    });
  } else {
    const recQuery = new Regions({
      regionsName,
      latitude,
      longitude,
      country,
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
