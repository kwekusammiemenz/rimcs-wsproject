import { CountriesProps, RegionsProps } from "@/src/Types/CordinatesProps";
import { getAPIDATA } from "../ApiCalls/apiActions";
import { boolean } from "zod";

const DataBaseTable = "Regions";

export const createBulkRegions = async (
  regions: RegionsProps[],
  countries: CountriesProps[]
) => {
  try {
    for (const recQuery of regions) {
      for (const subQuery of countries) {
        if (recQuery.country == subQuery.countriesName) {
          try {
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
        }

        //console.log(dsQuery.region)
        //console.log(rgQuery.regionsName);

        //console.log(rgQuery.regionsName);
        //console.log(dsQuery.districtsName);
        //await createDistrict(recQuery);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const createRegions = async (data: RegionsProps) => {
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
