import { CountriesProps, RegionsProps } from "@/src/Types/DataTypesProps";
import { getAPIDATA } from "../ApiCalls/apiActions";
import { boolean } from "zod";

//const DataBaseTable = "Regions";

export const createBulkRegions = async (
  regions: RegionsProps[],
  countries: CountriesProps[],
  DataBaseTable: string
) => {
  try {
    let recRes: boolean = false;
    for (const recQuery of regions) {
      for (const subQuery of countries) {
        if (subQuery.countriesName.toLowerCase().includes(recQuery.country)) {
          const res = await fetch(getAPIDATA(DataBaseTable), {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              regionsName: recQuery.regionsName,
              latitude: recQuery.latitude,
              longitude: recQuery.longitude,
              country: subQuery._id,
            }),
          });
          if (!res.ok) {
            throw new Error("Failed to update record");
          }
        }
      }
    }
    recRes = true;
    return recRes;
  } catch (error) {
    console.log(error);
  }
};

export const createRegions = async (
  data: RegionsProps,
  DataBaseTable: string
) => {
  try {
    //const router = useRouter();
    console.log(data);
    const res = await fetch(getAPIDATA(DataBaseTable), {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        regionsName: data.regionsName,
        latitude: data.latitude,
        longitude: data.longitude,
        country: data.country,
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
