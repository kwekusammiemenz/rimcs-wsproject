import { CountriesProps } from "@/src/Types/DataTypesProps";
import { getAPIDATA } from "../ApiCalls/apiActions";
import { boolean } from "zod";

//const DataBaseTable = "Countries";

export const createBulkCountries = async (
  countries: CountriesProps[],
  DataBaseTable: string
) => {
  try {
    let recRes: boolean = false;
    for (const dsQuery of countries) {
      const res = await fetch(getAPIDATA(DataBaseTable), {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          countriesCode: dsQuery.countriesCode,
          countriesName: dsQuery.countriesName,
          latitude: dsQuery.latitude,
          longitude: dsQuery.longitude,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update record");
      }
    }
    recRes = true;
    return recRes;
  } catch (error) {
    console.log(error);
  }
};

export const createCountries = async (
  data: CountriesProps,
  DataBaseTable: string
) => {
  try {
    console.log(data);
    const res = await fetch(getAPIDATA(DataBaseTable), {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        countriesCode: data.countriesCode,
        countriesName: data.countriesName,
        latitude: data.latitude,
        longitude: data.longitude,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to update record");
    }

    //router.refresh();
    //router.push(`/${DataBaseTable}`);

    // // const user = await prisma.user.create({
    // //   data: {
    // //     districtsName: data.districtsName,
    // //     latitude: data.latitude,
    // //     longitude: data.longitude,
    // //     region: data.region,
    // //   },
    // // });
    // // revalidatePath("/");
    // // return user;
  } catch (error) {
    console.log(error);
  }
};
