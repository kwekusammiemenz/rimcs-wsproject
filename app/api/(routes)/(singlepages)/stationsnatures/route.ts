import StationsNatures from "@/app/api/models/stationsnatures";
import { dbConnect } from "@/app/api/mongo/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  await dbConnect();

  return await StationsNatures.find()
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
  const { stationsNaturesName } = await request.json();

  await dbConnect();

  const isExist = await StationsNatures.findOne({ stationsNaturesName });
  if (isExist) {
    new NextResponse(JSON.stringify({ message: "Record already exists" }), {
      status: 400,
    });
  } else {
    const recQuery = new StationsNatures({
      stationsNaturesName,
    });

    return recQuery
      .save()
      .then(
        (StationsNatures: any) =>
          new NextResponse(
            JSON.stringify({
              message: "Record Created",
              StationsNatures: StationsNatures,
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
