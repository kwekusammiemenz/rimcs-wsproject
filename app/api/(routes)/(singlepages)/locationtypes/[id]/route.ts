import LocationTypes from "@/app/api/models/locationtypes";
import { dbConnect } from "@/app/api/mongo/mongodb";
import { NextResponse } from "next/server";
export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;

  await dbConnect();

  return await LocationTypes.findOne({ _id: id })
    .then((recQuery) =>
      recQuery
        ? new NextResponse(
            JSON.stringify({
              message: "Record Found",
              LocationTypes: recQuery,
            }),
            {
              status: 200,
            }
          )
        : new NextResponse(JSON.stringify({ message: "Not found" }), {
            status: 404,
          })
    )
    .catch((error: any) => NextResponse.json({ error }, { status: 500 }));
};

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;
  const body = await request.json();
  const { newLocationTypesName: locationTypesName } = body;

  await dbConnect();

  return LocationTypes.findByIdAndUpdate(
    id,
    { locationTypesName },
    { new: true }
  )
    .then((recQuery) => {
      if (recQuery) {
        recQuery.set(body);
        return recQuery
          .save()
          .then(
            (LocationTypes: any) =>
              new NextResponse(
                JSON.stringify({
                  message: "Record updated",
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

  return await LocationTypes.findByIdAndDelete(id)
    .then((LocationTypes) =>
      LocationTypes
        ? new NextResponse(JSON.stringify({ message: "RecordDeleted" }), {
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
