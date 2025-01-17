import { NextResponse } from "next/server";
import Countries from "@/app/api/models/countries";
import { dbConnect } from "@/app/api/mongo/mongodb";

export const GET = async () => {
  await dbConnect();

  return await Countries.find()
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
  const { countriesCode, countriesName, latitude, longitude } =
    await request.json();

  await dbConnect();

  const isExist = await Countries.findOne({ countriesName });
  if (isExist) {
    new NextResponse(JSON.stringify({ message: "Record already exists" }), {
      status: 400,
    });
  } else {
    const recQuery = new Countries({
      countriesCode,
      countriesName,
      latitude,
      longitude,
    });

    return recQuery
      .save()
      .then(
        (Countries: any) =>
          new NextResponse(
            JSON.stringify({
              message: "Record Created",
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
  }
};

// import clientPromise from "../../mongo/mongodb";
// import { Countries } from "../../types/dbtypes";
// //import  Countries  from "@/app/api/models/countries";
// import { ObjectId } from "mongodb";
// import { NextApiRequest, NextApiResponse } from "next";
// import NextCors from "nextjs-cors";

// type Return = {
//     countries: Countries[];
// };

// export const getCountries = async (): Promise<Countries[]> => {
//   const mongoClient = await clientPromise;

//   const data = (await mongoClient
//     .db()
//     .collection("countries")
//     .find()
//     .toArray()) as Countries[];

//   return JSON.parse(JSON.stringify(data));
// };

// export const addCountries = async (customer: Countries): Promise<ObjectId> => {
//   const mongoClient = await clientPromise;

//   const response = await mongoClient
//     .db()
//     .collection("countries")
//     .insertOne(customer);

//   return response.insertedId;
// };

// export const GET = async()=>{
//    const data = await getCountries();
//     //res.status(200).json({ countries: data });
//     return new NextResponse(JSON.stringify({ countries: data }), {status: 200,
//           })

// }

// export const   POST = async(req: Request) => {

// const countries: Countries = {
//          countriesCode: req.body.countriesCode,
//          countriesName: req.body.countriesName,
//          latitude: req.body.latitude,
//          longitude: req.body.longitude,

//   //return Response.json({ slug })
// }

//       const insertedId = await addCountries(countries);
//       // res.revalidate("/countries");
//       // res.revalidate("/countries/" + insertedId);
//       // res.status(200).json(insertedId);

// }

// // export default async (  req: NextApiRequest,  res: NextApiResponse<Return | ObjectId | { error: string }>) => {
// //   await NextCors(req, res, { methods: ["GET", "POST"],
// //     origin: [
// //       "http://localhost:3000",
// //       "http://localhost:3001",
// //       "http://localhost:3002",
// //     ],
// //     optionsSuccessStatus: 200,
// //   });

// //   if (req.method === "GET") {
// //     const data = await getCountries();
// //     res.status(200).json({ countries: data });
// //   }

// //   else if (req.method === "POST") {
// //     if (req.body.countriesCode && req.body.countriesName) {
// //       const countries: Countries = {
// //         countriesCode: req.body.countriesCode,
// //         countriesName: req.body.countriesName,
// //         latitude: req.body.latitude,
// //         longitude: req.body.longitude,

// //         // orders: req.body.orders.map((order: Order) => {
// //         //     return { ...order, _id: new ObjectId() };
// //         // }),
// //       };

// //       const insertedId = await addCountries(countries);
// //       res.revalidate("/countries");
// //       res.revalidate("/countries/" + insertedId);
// //       res.status(200).json(insertedId);
// //     } else {
// //       res.status(400).json({ error: "name and industry are required." });
// //     }
// //   }
// // };
