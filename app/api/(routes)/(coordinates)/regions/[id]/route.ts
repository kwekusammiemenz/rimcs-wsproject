import { NextResponse } from "next/server";
import Regions from "@/app/api/models/regions";
import { dbConnect } from "@/app/api/mongo/mongodb";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;

  await dbConnect();

  return await Regions.findOne({ _id: id })
    //.populate("country")
    .then((recQuery) =>
      recQuery
        ? new NextResponse(
            JSON.stringify({ message: "Record Found", Regions: recQuery }),
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
    newRegionsName: regionsName,
    newLatitude: latitude,
    newLongitude: longitude,
    newCountry: country,
  } = body;

  await dbConnect();

  return Regions.findByIdAndUpdate(
    id,
    { regionsName, latitude, longitude, country },
    { new: true }
  )
    .then((recQuery) => {
      if (recQuery) {
        recQuery.set(body);
        return recQuery
          .save()
          .then(
            (Regions: any) =>
              new NextResponse(
                JSON.stringify({
                  message: "Record updated",
                  Regions: Regions,
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

  return await Regions.findByIdAndDelete(id)
    .then((Regions) =>
      Regions
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
