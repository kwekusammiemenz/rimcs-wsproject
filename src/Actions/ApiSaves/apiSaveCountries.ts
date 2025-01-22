import { CountriesProps } from "@/src/Types/CordinatesProps";
import { getAPIDATA } from "../ApiCalls/apiActions";

const DataBaseTable = "Countries";

export const createBulkCountries = async (countries: CountriesProps[]) => {
  try {
    for (const dsQuery of countries) {
      try {
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
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const createDistrict = async (data: CountriesProps) => {
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
