import Sponsors from "@/app/api/models/sponsors";
import { dbConnect } from "@/app/api/mongo/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  await dbConnect();

  return await Sponsors.find()
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
  const { sponsorsName } = await request.json();

  await dbConnect();

  const isExist = await Sponsors.findOne({ sponsorsName });
  if (isExist) {
    new NextResponse(JSON.stringify({ message: "Record already exists" }), {
      status: 400,
    });
  } else {
    const recQuery = new Sponsors({
      sponsorsName,
    });

    return recQuery
      .save()
      .then(
        (Sponsors: any) =>
          new NextResponse(
            JSON.stringify({
              message: "Record Created",
              Sponsors: Sponsors,
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
