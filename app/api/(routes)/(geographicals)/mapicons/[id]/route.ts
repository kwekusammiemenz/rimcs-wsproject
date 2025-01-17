import { NextResponse } from "next/server";
import MapIcons from "@/app/api/models/mapicons";
import { dbConnect } from "@/app/api/mongo/mongodb";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
 const id = (await params).id;

  await dbConnect();

  return await MapIcons.findOne({ _id: id })
    //.populate("operator")
    .then((recQuery) =>
      recQuery
        ? new NextResponse(
            JSON.stringify({
              message: "Record Found",
              MapIcons: recQuery,
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
  const { newMapIconsName: mapIconsName, newOperator: operator } = body;

  await dbConnect();

  return MapIcons.findByIdAndUpdate(
    id,
    { mapIconsName, operator },
    { new: true }
  )
    .then((recQuery) => {
      if (recQuery) {
        recQuery.set(body);
        return recQuery
          .save()
          .then(
            (MapIcons: any) =>
              new NextResponse(
                JSON.stringify({
                  message: "Record updated",
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

  return await MapIcons.findByIdAndDelete(id)
    .then((MapIcons) =>
      MapIcons
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
