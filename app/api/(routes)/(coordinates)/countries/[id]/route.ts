import { NextResponse } from "next/server";
import Countries from "@/app/api/models/countries";
import { dbConnect } from "@/app/api/mongo/mongodb";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;

  await dbConnect();

  return await Countries.findOne({ _id: id })
    .then((recQuery) =>
      recQuery
        ? new NextResponse(
            JSON.stringify({ message: "Record Found", Countries: recQuery }),
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
    newCountriesCode: countriesCode,
    newCountriesName: countriesName,
    newLatitude: latitude,
    newLongitude: longitude,
  } = body;

  await dbConnect();

  return Countries.findByIdAndUpdate(
    id,
    { countriesCode, countriesName, latitude, longitude },
    { new: true }
  )
    .then((recQuery) => {
      if (recQuery) {
        recQuery.set(body);
        return recQuery
          .save()
          .then(
            (Countries: any) =>
              new NextResponse(
                JSON.stringify({
                  message: "Record updated",
                  Countries: Countries,
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

  return await Countries.findByIdAndDelete(id)
    .then((Countries) =>
      Countries
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

// // export const GET = async (  req: Request,  { params }: { params: { id: string } }) => {
// //  const id = (await params).id;
// //   return Response.json({ id });
// // };

// // export async function GET(  request: Request,{ params }: { params: Promise<{ id: string }> }) {
// //   const slug = (await params).id // 'a', 'b', or 'c'
// //   return Response.json({ slug });
// // }
