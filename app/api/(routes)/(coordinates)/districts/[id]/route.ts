import { NextResponse } from "next/server";
import Districts from "@/app/api/models/districts";
import { dbConnect } from "@/app/api/mongo/mongodb";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
 const id = (await params).id;

  await dbConnect();

  return await Districts.findOne({ _id: id })
    //.populate("region")
    .then((recQuery) =>
      recQuery
        ? new NextResponse(
            JSON.stringify({ message: "Record Found", Districts: recQuery }),
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
  const {
    newDistrictsName: districtsName,
    newLatitude: latitude,
    newLongitude: longitude,
    newRegion: region,
  } = body;

  await dbConnect();

  return Districts.findByIdAndUpdate(
    id,
    { districtsName, latitude, longitude, region },
    { new: true }
  )
    .then((recQuery) => {
      if (recQuery) {
        recQuery.set(body);
        return recQuery
          .save()
          .then(
            (Districts: any) =>
              new NextResponse(
                JSON.stringify({
                  message: "Record updated",
                  Districts: Districts,
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

  return await Districts.findByIdAndDelete(id)
    .then((Districts) =>
      Districts
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
