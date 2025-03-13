import { NextResponse } from "next/server";
import { dbConnect } from "@/app/api/mongo/mongodb";
import Sponsors from "@/app/api/models/sponsors";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
 const id = (await params).id;

  await dbConnect();

  return await Sponsors.findOne({ _id: id })
    .then((recQuery) =>
      recQuery
        ? new NextResponse(
            JSON.stringify({ message: "Record Found", Sponsors: recQuery }),
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
  const { newSponsorsName: sponsorsName } = body;

  await dbConnect();

  return Sponsors.findByIdAndUpdate(id, { sponsorsName }, { new: true })
    .then((recQuery) => {
      if (recQuery) {
        recQuery.set(body);
        return recQuery
          .save()
          .then(
            (Sponsors: any) =>
              new NextResponse(
                JSON.stringify({
                  message: "Record updated",
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

  return await Sponsors.findByIdAndDelete(id)
    .then((Sponsors) =>
      Sponsors
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
