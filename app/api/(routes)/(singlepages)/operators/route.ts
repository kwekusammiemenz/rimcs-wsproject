import Operators from "@/app/api/models/operators";
import { dbConnect } from "@/app/api/mongo/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  await dbConnect();

  return await Operators.find()
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
  const { operatorsName } = await request.json();

  await dbConnect();

  const isExist = await Operators.findOne({ operatorsName });
  if (isExist) {
    new NextResponse(JSON.stringify({ message: "Record already exists" }), {
      status: 400,
    });
  } else {
    const recQuery = new Operators({
      operatorsName,
    });

    return recQuery
      .save()
      .then(
        (Operators: any) =>
          new NextResponse(
            JSON.stringify({
              message: "Record Created",
              Operators: Operators,
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
