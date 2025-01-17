import { NextResponse } from "next/server";
import MapIcons from "@/app/api/models/mapicons";
import { dbConnect } from "@/app/api/mongo/mongodb";

export const GET = async () => {
  await dbConnect();

  return await MapIcons.find()
    //.populate("operator")
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
  const { mapIconsName, operator } = await request.json();

  await dbConnect();

  const isExist = await MapIcons.findOne({
    mapIconsName,
  });
  if (isExist) {
    new NextResponse(JSON.stringify({ message: "Record already exists" }), {
      status: 400,
    });
  } else {
    const recQuery = new MapIcons({
      mapIconsName,
      operator,
    });

    return recQuery
      .save()
      .then(
        (MapIcons: any) =>
          new NextResponse(
            JSON.stringify({
              message: "Record Created",
              MapIcons: MapIcons,
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
